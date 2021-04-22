import React, { createContext, useEffect, useReducer } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import RtcEngine, { AudienceLatencyLevelType, ChannelProfile, ClientRole, VideoFrameRate, VideoOutputOrientationMode } from 'react-native-agora'
import API from '../API/API'
import useStream from '../hooks/useStream'
import { useUser } from '../hooks/useUser'
import { SET_ROLE } from '../reducers/stream'
import streamSpeakers, { ACTIVE_SPEAKER_UPDATED, initialState, JOINED_STREAM, LEFT_STREAM, SET_ENGINE, SPEAKER_AUDIO_STATE_CHANGED, SPEAKER_JOINED, SPEAKER_LEFT, SPEAKER_VIDEO_STATE_CHANGED } from '../reducers/streamSpeakers'

const APP_ID = 'af6ff161187b4527ac35d01f200f7980'
export const StreamSpeakersContext = createContext()

export default function StreamSpeakersProvider({ children }) {
  const { joinStream, initSocketListeners, leaveStream } = useStream()
  const { user } = useUser()
  const [{
    engine,
    isJoinedSpeakers,
    speakers,
    audioMuted,
    videoMuted,
    activeSpeaker,
  }, dispatch] = useReducer(streamSpeakers, initialState)

  useEffect(() => {
    if (speakers?.length === 1) {
      _setActiveSpeaker(speakers?.[0]?.streamID)
    }
  }, [speakers?.length])

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

    // Check my client role and set it accordingly
    await _engine.setClientRole(ClientRole.Audience)

    // Set audio route to speaker
    await _engine.setDefaultAudioRoutetoSpeakerphone(true);

    dispatch({
      type: SET_ENGINE,
      payload: _engine
    })
  }

  const _initEngineListeners = async () => {
    // engine?.addListener('Warning', (warn) => console.log('WARNING', warn))
    // engine?.addListener('Error', (err) => console.log('ERROR', err))
    engine?.addListener('UserJoined', _speakerJoined)
    engine?.addListener('UserOffline', _speakerLeft)
    engine?.addListener('JoinChannelSuccess', _joinedStream)
    engine?.addListener('LeaveChannel', _leaveStream)
    engine?.addListener('ActiveSpeaker', _setActiveSpeaker)
    engine?.addListener('LocalVideoStateChanged', (newState) => speakerStateChanged(user?.streamID, newState, 'VIDEO'))
    engine?.addListener('LocalAudioStateChanged', (newState) => speakerStateChanged(user?.streamID, newState, 'AUDIO'))
    engine?.addListener('RemoteVideoStateChanged', (speakerID, newState) => speakerStateChanged(speakerID, newState, 'VIDEO'))
    engine?.addListener('RemoteAudioStateChanged', (speakerID, newState) => speakerStateChanged(speakerID, newState, 'AUDIO'))
    engine?.addListener('ClientRoleChanged', _clientRoleChanged)
  }

  const _clientRoleChanged = (oldRole, newRole) => {
    const isSpeaker = newRole === 1
    dispatch({
      type: SET_ROLE,
      payload: newRole
    })

    if (isSpeaker) {
      _speakerJoined(user?.streamID)
    } else {
      _speakerLeft(user?.streamID)
    }
  }

  const _leaveStream = async () => {
    engine?.leaveChannel()
    engine?.removeAllListeners()
    dispatch({ type: LEFT_STREAM })
    leaveStream()
  }

  const _joinStream = async (streamID: string) => {
    _initEngineListeners()
    initSocketListeners()

    // Check the current users client role, and set it before joining the stream
    const { onStage, owners } = await API.Streams.getStreamByID(streamID)
    const isSpeaker = onStage?.includes(user?._id) || owners?.includes(user?._id)
    await _updateClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)

    const token = await API.Streams.getStreamToken(streamID)
    await engine?.joinChannel(
      token,
      streamID,
      null,
      user?.streamID,
      undefined
    );
  }

  const _speakerJoined = async (speakerID: number) => {
    const speaker = await API.Users.getUserByStreamID(speakerID)
    dispatch({
      type: SPEAKER_JOINED,
      payload: speaker
    })
  }

  const _speakerLeft = async (speakerID: number) => {
    dispatch({
      type: SPEAKER_LEFT,
      payload: speakerID
    })
  }

  const _joinedStream = async (streamID: string) => {
    dispatch({ type: JOINED_STREAM })

    // Only after joining Agora engine, is when socket emits 'join-stream', then fetches the current state of the stream
    // from the API
    joinStream({ streamID })
  }

  const _setActiveSpeaker = (streamID: number) => {
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

  const _updateClientRole = async (role: ClientRole) => {
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
        isJoinedSpeakers,
        speakers,
        audioMuted,
        videoMuted,
        activeSpeaker,
        updateClientRole: _updateClientRole,
        leaveStream: _leaveStream,
        joinStream: _joinStream,
        setActiveSpeaker: _setActiveSpeaker,
      }}
    >
      {children}
    </StreamSpeakersContext.Provider>
  )
}
