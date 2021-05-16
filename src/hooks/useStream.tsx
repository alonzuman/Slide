import React, { useContext } from "react";
import {
  AudienceLatencyLevelType,
  BeautyOptions,
  ClientRole,
  ErrorCode,
  RtcStats,
  VideoFrameRate,
  VideoOutputOrientationMode,
  WarningCode,
} from "react-native-agora";
import { useQuery } from "react-query";
import API from "../API/API";
import { StreamMembersContext } from "../providers/StreamProvider";
import {
  activeSpeakerUpdated,
  joinedStream,
  leftStream,
  setRole,
  speakerAudioStateChanged,
  speakerJoined,
  speakerLeft,
  speakerVideoStateChanged,
  streamUpdated,
} from "../slices/stream";
import { useAppDispatch, useAppSelector } from "../store";
import { UserProfile } from "../types";
import utils from "../utils";
import useEngine from "./useEngine";
import useSnackbar from "./useSnackbar";
import useSocket from "./useSocket";
import useTraceUpdate from "./useTraceUpdate";
import {
  useUpdateUser,
  useUserName,
  useUserStreamID,
  useUserID,
  useUserConfig,
  useUserValue,
} from "./useUser";

export default function useStream() {
  const { openSnackbar } = useSnackbar();
  const { updateUser } = useUpdateUser();
  const userID = useUserID();
  const userName = useUserName();
  const userActiveStreamID = useUserValue("activeStreamID");
  const userStreamID = useUserStreamID();
  const socket = useSocket();
  const engine = useEngine();
  const userConfig = useUserConfig();
  const streamID = useStreamID();
  const videoMuted = useStreamVideoMuted();
  const audioMuted = useStreamAudioMuted();
  const appDispatch = useAppDispatch();
  const { refetch: refetchStreams } = useQuery(
    "streams",
    API.Streams.fetchLiveStreams
  );

  useTraceUpdate({ updateUser, socket, engine, streamID });

  const _initSocketListeners = async () => {
    // Init the socket listeners
    socket?.on("stream-updated", _onStreamUpdated);
    socket?.on("connect_error", _onSocketConnectError);
    socket?.on("disconnect", _onSocketDisconnected);
    socket?.on("connect", _onSocketConnected);
    socket?.on("reconnection_attempt", _onSocketReconnecting);
  };

  const _initEngineListeners = () => {
    // Init the engine listeners and their handlers
    engine?.addListener("Warning", _onEngineWarning);
    engine?.addListener("Error", _onEngineError);
    engine?.addListener("UserJoined", _onSpeakerJoined);
    engine?.addListener("UserOffline", _onSpeakerLeft);
    engine?.addListener("JoinChannelSuccess", _onJoinedSuccess);
    engine?.addListener("LeaveChannel", _onLeftSuccess);
    engine?.addListener("ActiveSpeaker", _onActiveSpeakerChanged);
    engine?.addListener("LocalVideoStateChanged", _onLocalVideoStateChanged);
    engine?.addListener("LocalAudioStateChanged", _onLocalAudioStateChanged);
    engine?.addListener("RemoteVideoStateChanged", _onSpeakerVideoStateChanged);
    engine?.addListener("RemoteAudioStateChanged", _onSpeakerAudioStateChanged);
    engine?.addListener("ClientRoleChanged", _onClientRoleChanged);
    engine?.addListener("TokenPrivilegeWillExpire", _onTokenWillExpire);
  };

  // #################################################################
  // #################################################################
  // #################################################################
  // Event handlers
  // #################################################################
  // #################################################################
  // #################################################################
  const _onTokenWillExpire = async () => {
    // Rejoin the stream using the new token from the DB
    console.log("TOKEN IS ABOUT TO EXPIRE");
    const token = await API.Streams.getStreamToken(streamID);
    engine?.renewToken(token);
  };

  const _removeAllListeners = () => {
    socket?.off("stream-updated");
    socket?.off("connect_error");
    socket?.off("disconnect");
    socket?.off("connect");
    socket?.off("reconnection_attempt");
    engine?.removeAllListeners();
  };

  const _onSocketReconnecting = () => {
    openSnackbar({
      primary: "Connection is slow",
      secondary: "Reconnecting...",
      type: "WARNING",
    });
  };

  const _onSocketDisconnected = () => {
    // TODO: reconnect to socket
    openSnackbar({
      primary: "Error",
      secondary: "Connection error",
      type: "ERROR",
    });
  };

  const _onSocketConnected = () => {};

  const _onSocketConnectError = () => {
    openSnackbar({
      primary: "Error",
      secondary: "Connection error",
      type: "ERROR",
    });
  };

  const _onEngineError = (error: ErrorCode) => {
    console.log("ERROR", error, userName);
    const secondary = utils.Stream.engineErrorMessage(error);

    if (secondary) {
      openSnackbar({
        primary: "Error",
        secondary,
        type: "ERROR",
      });
    }
  };

  const _onEngineWarning = (warning: WarningCode) => {
    console.log("WARNING", warning, userName);
    const secondary = utils.Stream.engineWarningMessage(warning);
    if (secondary) {
      openSnackbar({
        primary: "Warning",
        secondary,
        type: "WARNING",
      });
    }
  };

  const _onJoinedSuccess = async (streamID: string) => {
    console.log("JOINED SUCCESSFULLY", streamID, userName);
    // Initially, client will manually fetch the stream data
    socket?.emit("join-stream", { streamID });
    const stream = await API.Streams.getStreamByID(streamID);

    appDispatch(joinedStream(stream));
  };

  const _onLeftSuccess = (stats: RtcStats) => {
    socket?.emit("leave-stream", { streamID: userActiveStreamID });

    appDispatch(leftStream());

    _removeAllListeners();
    refetchStreams();
  };

  const _onSpeakerJoined = async (speakerID: number) => {
    console.log("SPEAKER JOINED", speakerID, userName);
    const speaker = await API.Users.getUserByStreamID(speakerID);

    appDispatch(speakerJoined(speaker));
  };

  const _onSpeakerLeft = async (speakerID: number) => {
    console.log("SPEAKER LEFT", speakerID, userName);
    appDispatch(speakerLeft(speakerID));
  };

  const _onSpeakerAudioStateChanged = (speakerID: number, newState: number) => {
    appDispatch(speakerAudioStateChanged({ speakerID, newState }));
  };

  const _onSpeakerVideoStateChanged = (speakerID: number, newState: number) => {
    appDispatch(speakerVideoStateChanged({ speakerID, newState }));
  };

  const _onLocalVideoStateChanged = (newState, oldState) => {
    console.log("LOCAL VIDEO STATE CHANGED", userName);
    appDispatch(
      speakerVideoStateChanged({ speakerID: userStreamID, newState })
    );
  };

  const _onLocalAudioStateChanged = (newState, oldState) => {
    console.log("LOCAL AUDIO STATE CHANGED", userName);
    appDispatch(
      speakerAudioStateChanged({ speakerID: userStreamID, newState })
    );
  };

  const _onClientRoleChanged = (oldRole, newRole) => {
    const isSpeaker = newRole === 1;
    appDispatch(setRole(newRole));

    if (isSpeaker) {
      _onSpeakerJoined(userStreamID);
    } else {
      _onSpeakerLeft(userStreamID);
    }
  };

  const _onActiveSpeakerChanged = (speakerID: number) => {
    setActiveSpeaker(speakerID);
  };

  const _onStreamUpdated = (data: Stream) => {
    console.log("STREAM UPDATED", userName);
    appDispatch(streamUpdated(data));
  };

  // #################################################################
  // #################################################################
  // #################################################################
  // Public functions
  // #################################################################
  // #################################################################
  // #################################################################

  const joinStream = async (newStreamID: string) => {
    _initEngineListeners();
    _initSocketListeners();

    // Check the current users client role, and set it before joining the stream
    const { onStage, owners } = await API.Streams.getStreamByID(newStreamID);
    const isSpeaker = onStage?.includes(userID) || owners?.includes(userID);
    await updateClientRole(
      isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience
    );

    const token = await API.Streams.getStreamToken(newStreamID);
    await engine?.setBeautyEffectOptions(true, userConfig?.stream);

    await engine?.joinChannel(
      token,
      newStreamID,
      null,
      userStreamID,
      undefined
    );
  };

  const leaveStream = async () => {
    await socket?.emit("leave-stream", { streamID });
    await engine?.leaveChannel();
  };

  const switchStream = async (newStreamID: string) => {
    console.log("SWITCHING STREAM", userName);

    // Check the current users client role, and set it before joining the stream
    const { onStage, owners } = await API.Streams.getStreamByID(newStreamID);
    const isSpeaker = onStage?.includes(userID) || owners?.includes(userID);
    await updateClientRole(
      isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience
    );

    const token = await API.Streams.getStreamToken(newStreamID);
    await engine?.switchChannel(token, newStreamID);
  };

  const updateClientRole = async (role: ClientRole) => {
    let option;
    if (role === ClientRole.Broadcaster) {
      // Set the video config
      await engine?.setVideoEncoderConfiguration({
        dimensions: {
          width: 640,
          height: 360,
        },
        frameRate: VideoFrameRate.Fps30,
        orientationMode: VideoOutputOrientationMode.Adaptative,
      });

      // Renew token
      // const token = await API.Streams.getStreamToken(streamID)
      // await engine?.renewToken(token)

      // Unraise hand incase hand was raised by speaker
      unraiseHand();

      // Make sure to not open or close the users audio / video without their permission
      const isAudioMuted = audioMuted?.includes(userStreamID);
      const isVideoMuted = videoMuted?.includes(userStreamID);

      // Enable camera/mic, this will bring up permission dialog for first time
      await engine?.enableLocalAudio(!isAudioMuted);
      await engine?.enableLocalVideo(!isVideoMuted);
    } else {
      // You have to provide client role options if set to audience
      option = { audienceLatencyLevel: AudienceLatencyLevelType.LowLatency };
    }
    await engine?.setClientRole(role, option);
  };

  const refetchStream = async () => {
    console.log("REFETCHED STREAM", userName);
    const stream = await API.Streams.getStreamByID(streamID);
    appDispatch(streamUpdated(stream));
  };

  const setActiveSpeaker = (speakerID: number) => {
    console.log("ACTIVE SPEAKER CHANGED", speakerID, userName);
    appDispatch(activeSpeakerUpdated(speakerID));
  };

  const sendStreamInvite = async (userID: string) => {
    socket?.emit("send-invite", { streamID, userID });
  };

  const raiseHand = () => {
    socket?.emit("raise-hand", { streamID });
  };

  const unraiseHand = () => {
    socket?.emit("unraise-hand", { streamID });
  };

  const endStream = () => {
    socket?.emit("end-stream", { streamID });
  };

  const muteLocalAudio = () => {
    console.log("MUTING LOCAL AUDIO", userName);
    engine?.enableLocalAudio(false);
    engine?.muteLocalAudioStream(true);
  };

  const muteLocalVideo = () => {
    console.log("MUTING LOCAL VIDEO", userName);
    engine?.enableLocalVideo(false);
    engine?.muteLocalVideoStream(true);
  };

  const unMuteLocalAudio = () => {
    console.log("UNMUTING LOCAL AUDIO", userName);
    engine?.enableLocalAudio(true);
    engine?.muteLocalAudioStream(false);
  };

  const unMuteLocalVideo = () => {
    console.log("UNMUTING LOCAL VIDEO", userName);
    engine?.enableLocalVideo(true);
    engine?.muteLocalVideoStream(false);
  };

  const switchCamera = () => {
    engine?.switchCamera();
  };

  const makeSpeaker = (oldStage: string[], userID: string) => {
    const updatedStage = [...oldStage, userID];
    socket?.emit("update-stream", { streamID, onStage: updatedStage });
  };

  const makeAudience = (oldStage: string[], userID: string) => {
    const updatedStage = [...oldStage?.filter((v) => v !== userID)];
    socket?.emit("update-stream", { streamID, onStage: updatedStage });
  };

  const updateBeautyOptions = (options: BeautyOptions) => {
    updateUser({
      config: {
        stream: options,
      },
    });
    engine?.setBeautyEffectOptions(true, options);
  };

  return {
    switchCamera,
    unMuteLocalAudio,
    unMuteLocalVideo,
    muteLocalVideo,
    muteLocalAudio,
    leaveStream,
    switchStream,
    joinStream,
    raiseHand,
    unraiseHand,
    endStream,
    updateClientRole,
    setActiveSpeaker,
    refetchStream,
    sendStreamInvite,
    makeAudience,
    makeSpeaker,
    updateBeautyOptions,
  };
}

export const useStreamMeta = () => useAppSelector((state) => state.stream.meta);

export const useStreamSpeakers = () =>
  useAppSelector((state) => state.stream.speakers);

export const useStreamSpeaker = (speakerID: number) =>
  useAppSelector((state) =>
    state.stream.speakers?.find((speaker) => speaker.streamID === speakerID)
  );

export const useStreamMembers = () =>
  useAppSelector((state) => state.stream.members);

export const useStreamAudience = () =>
  useAppSelector((state) => state.stream.audience);

export const useStreamAudienceMember = (userID: string) =>
  useAppSelector((state) =>
    state.stream.audience?.find((audience) => audience?._id === userID)
  ) as UserProfile;

export const useStreamActiveSpeaker = () =>
  useAppSelector((state) => state.stream.activeSpeaker);

export const useStreamRole = () => useAppSelector((state) => state.stream.role);

export const useStreamOnStage = () =>
  useAppSelector((state) => state.stream.onStage);

export const useStreamOwners = () =>
  useAppSelector((state) => state.stream.owners);

export const useStreamInvites = () =>
  useAppSelector((state) => state.stream.invites);

export const useStreamRaisedHands = () =>
  useAppSelector((state) => state.stream.raisedHands);

export const useStreamID = () =>
  useAppSelector((state) => state.stream.streamID);

export const useStreamIsJoined = () =>
  useAppSelector((state) => state.stream.isJoined);

export const useStreamVideoMuted = () =>
  useAppSelector((state) => state.stream.videoMuted);

export const useStreamVideoMutedSpeaker = (speakerID: number) =>
  useAppSelector((state) => state.stream.videoMuted?.includes(speakerID));

export const useStreamAudioMuted = () =>
  useAppSelector((state) => state.stream.audioMuted);

export const useStreamAudioMutedSpeaker = (speakerID: number) =>
  useAppSelector((state) => state.stream.audioMuted?.includes(speakerID));

export const useStreamIsLive = () =>
  useAppSelector((state) => state.stream.isLive);

export const useStreamUserRole = (userID: string) => {
  const speakers = useStreamSpeakers();
  const owners = useStreamOwners();

  const isSpeaker = speakers?.find((s) => s?._id === userID);
  const isOwner = owners?.includes(userID);

  return isOwner || isSpeaker ? "SPEAKER" : "AUDIENCE";
};
