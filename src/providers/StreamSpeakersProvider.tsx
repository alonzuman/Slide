import React, { createContext, useEffect, useReducer, useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import RtcEngine, { AudienceLatencyLevelType, ChannelProfile, ClientRole, VideoFrameRate, VideoOutputOrientationMode } from 'react-native-agora'
import API from '../API/API'
import useStreamMembers from '../hooks/useStreamMembers'
import useStreamMeta from '../hooks/useStreamMeta'
import { useUser } from '../hooks/useUser'
const APP_ID = 'af6ff161187b4527ac35d01f200f7980'

export const StreamSpeakersContext = createContext()

export default function StreamSpeakersProvider({ children }) {
  const [engine, setEngine] = useState<RtcEngine | null>(null)
  const { setMeta, streamID } = useStreamMeta()
  const { socket, setStore } = useStreamMembers()
  const { user } = useUser()
  const [state, dispatch] = useReducer(speakersReducer, initialState)

  useEffect(() => {
    if (state?.speakers?.length === 1) {
      setActiveSpeaker(state?.speakers?.[0]?.streamID)
    }
  }, [state?.speakers])

  useEffect(() => {
    _initEngine()
  }, [])

  const _initEngine = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
    const _engine = await RtcEngine.create(APP_ID)

    // Set it to work on the background
    await _engine?.setParameters('{"che.audio.opensl":true}')
    await _engine?.enableAudioVolumeIndication(200, 10, true)

    // enable video module and set up video encoding configs
    await _engine.enableVideo();

    // make this room live broadcasting room
    await _engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await _engine.setClientRole(ClientRole.Audience)

    // Set audio route to speaker
    await _engine.setDefaultAudioRoutetoSpeakerphone(true);

    setEngine(_engine)
  }

  const _applyListeners = async () => {
    engine?.addListener('Warning', (warn) => console.log('WARNING', warn))
    engine?.addListener('Error', (err) => console.log('ERROR', err))
    engine?.addListener('UserJoined', async (speakerID) => await speakerJoined(speakerID))
    engine?.addListener('UserOffline', async (speakerID) => await speakerLeft(speakerID))
    engine?.addListener('JoinChannelSuccess', async (streamID) => await joinedStream(streamID))
    engine?.addListener('LeaveChannel', (stats) => leftStream())
    engine?.addListener('ActiveSpeaker', (speakerID) => setActiveSpeaker(speakerID))
    engine?.addListener('LocalVideoStateChanged', (newState) => speakerStateChanged(user?.streamID, newState, 'VIDEO'))
    engine?.addListener('LocalAudioStateChanged', (newState) => speakerStateChanged(user?.streamID, newState, 'AUDIO'))
    engine?.addListener('RemoteVideoStateChanged', (speakerID, newState) => speakerStateChanged(speakerID, newState, 'VIDEO'))
    engine?.addListener('RemoteAudioStateChanged', (speakerID, newState) => speakerStateChanged(speakerID, newState, 'AUDIO'))
    engine?.addListener('ClientRoleChanged', (oldRole, newRole) => {
      const isSpeaker = newRole === 1
      if (isSpeaker) {
        speakerJoined(user?.streamID)
      } else {
        speakerLeft(user?.streamID)
      }
    })
  }

  const leaveStream = async () => {
    engine?.leaveChannel()
    socket?.emit('leave-stream', ({ streamID }))
  }

  const joinStream = async (streamID: string) => {
    _applyListeners()
    const { onStage } = await API.Streams.getStreamByID(streamID)

    const isSpeaker = onStage?.includes(user?._id)
    await updateClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)

    const token = await API.Streams.getStreamToken(streamID)
    await engine?.joinChannel(
      token,
      streamID,
      null,
      user?.streamID,
      undefined
    );
    socket?.emit('join-stream', ({ streamID }))
  }

  const speakerJoined = async (speakerID: number) => {
    // await engine?.muteRemoteAudioStream(speakerID, true)
    // await engine?.muteRemoteVideoStream(speakerID, true)
    const speaker = await API.Users.getUserByStreamID(speakerID)
    dispatch({
      type: SPEAKER_JOINED,
      payload: speaker
    })
  }

  const speakerLeft = async (speakerID: number) => {
    dispatch({
      type: SPEAKER_LEFT,
      payload: speakerID
    })
  }

  const joinedStream = async (streamID: string) => {
    const { meta, owners, onStage, members, audience, raisedHands } = await API.Streams.getStreamByID(streamID)

    dispatch({ type: JOINED_STREAM })
    setStore({
      owners,
      onStage,
      members,
      audience,
      raisedHands
    })
    setMeta({
      meta,
      streamID,
    })
  }

  const leftStream = () => {
    dispatch({ type: LEFT_STREAM })
    engine?.removeAllListeners()
  }

  const setActiveSpeaker = (streamID: number) => {
    dispatch({
      type: ACTIVE_SPEAKER_UPDATED,
      payload: streamID
    })
  }

  const speakerStateChanged = (speakerID: number, newState: number, type: 'AUDIO' | 'VIDEO') => {
    dispatch({
      type: type === 'AUDIO' ? SPEAKER_AUDIO_STATE_CHANGED : SPEAKER_VIDEO_STATE_CHANGED,
      payload: { speakerID, newState, type }
    })
  }

  const updateClientRole = async (role: ClientRole) => {
    let option;
    if (role === ClientRole.Broadcaster) {
      await engine?.setVideoEncoderConfiguration({
        dimensions: {
          width: 640,
          height: 360,
        },
        frameRate: VideoFrameRate.Fps30,
        orientationMode: VideoOutputOrientationMode.Adaptative,
      });
      // enable camera/mic, this will bring up permission dialog for first time
      await engine?.enableLocalAudio(true);
      await engine?.enableLocalVideo(true);
    } else {
      // You have to provide client role options if set to audience
      option = { audienceLatencyLevel: AudienceLatencyLevelType.LowLatency };
    }
    await engine?.setClientRole(role, option);
  };

  return (
    <StreamSpeakersContext.Provider
      value={{
        engine,
        isJoined: state.isJoined,
        speakers: state.speakers,
        audioMuted: state.audioMuted,
        videoMuted: state.videoMuted,
        activeSpeaker: state.activeSpeaker,
        updateClientRole,
        leaveStream,
        joinStream,
        setActiveSpeaker,
      }}
    >
      {children}
    </StreamSpeakersContext.Provider>
  )
}

const speakersReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case JOINED_STREAM: return {
      ...state,
      isJoined: true
    }
    case SPEAKER_JOINED: return {
      ...state,
      speakers: state.speakers?.find(v => v?.streamID === payload?.streamID) ? [...state.speakers] : [...state.speakers, payload]
    }
    case SPEAKER_LEFT: return {
      ...state,
      speakers: state?.speakers?.filter(v => v?.streamID !== payload)
    }
    case ACTIVE_SPEAKER_UPDATED: return {
      ...state,
      activeSpeaker: payload
    }
    case SPEAKER_AUDIO_STATE_CHANGED: {
      const { newState, speakerID } = payload;
      const isMuted = newState === 0
      return {
        ...state,
        audioMuted: isMuted ? [...state?.audioMuted, speakerID] : [...state?.audioMuted?.filter(v => v !== speakerID)]
      }
    }
    case SPEAKER_VIDEO_STATE_CHANGED: {
      const { newState, speakerID } = payload;
      const isMuted = newState === 0
      return {
        ...state,
        videoMuted: isMuted ? [...state?.videoMuted, speakerID] : [...state?.videoMuted?.filter(v => v !== speakerID)]
      }
    }
    case LEFT_STREAM: return initialState
    default: return state;
  }
}

const initialState = {
  isJoined: false,
  speakers: [],
  audioMuted: [],
  videoMuted: [],
  activeSpeaker: null
}

const JOINED_STREAM = 'SPEAKERS_PROVIDER/JOINED_STREAM';
const SPEAKER_JOINED = 'SPEAKERS_PROVIDER/SPEAKER_JOINED';
const SPEAKER_LEFT = 'SPEAKERS_PROVIDER/SPEAKER_LEFT';
const ACTIVE_SPEAKER_UPDATED = 'SPEAKERS_PROVIDER/ACTIVE_SPEAKER_UPDATED';
const SPEAKER_AUDIO_STATE_CHANGED = 'SPEAKERS_PROVIDER/SPEAKER_AUDIO_STATE_CHANGED';
const SPEAKER_VIDEO_STATE_CHANGED = 'SPEAKERS_PROVIDER/SPEAKER_VIDEO_STATE_CHANGED';
const LEFT_STREAM = 'SPEAKERS_PROVIDER/LEFT_STREAM';
