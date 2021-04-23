import React, { createContext, useEffect, useReducer, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import API, { SOCKET_URL } from '../API/API'
import { useUser } from '../hooks/useUser'
import auth from '@react-native-firebase/auth'
import stream, { ACTIVE_SPEAKER_UPDATED, initialState, JOINED_STREAM, LEFT_STREAM, SET_ROLE, SPEAKER_AUDIO_STATE_CHANGED, SPEAKER_JOINED, SPEAKER_LEFT, SPEAKER_VIDEO_STATE_CHANGED, STREAM_UPDATED } from '../reducers/stream'
import { PermissionsAndroid, Platform } from 'react-native'
import RtcEngine, { AudienceLatencyLevelType, ChannelProfile, ClientRole, ErrorCode, VideoFrameRate, VideoOutputOrientationMode, WarningCode } from 'react-native-agora'
import { useQuery } from 'react-query'
import useSnackbar from '../hooks/useSnackbar'
import utils from '../utils'
import { Stream } from '../types'

const APP_ID = 'af6ff161187b4527ac35d01f200f7980'
export const StreamMembersContext = createContext()

export default function StreamProvider({ children }: { childrne?: any }) {
  const { openSnackbar } = useSnackbar()
  const { refetch: refetchStreams } = useQuery('streams', API.Streams.fetchLiveStreams)
  const { user } = useUser()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [engine, setEngine] = useState<RtcEngine | null>(null)
  const [{
    streamID,
    audience,
    meta,
    members,
    raisedHands,
    onStage,
    owners,
    isLive,
    isJoined,
    speakers,
    audioMuted,
    videoMuted,
    activeSpeaker,
    role
  }, dispatch] = useReducer(stream, initialState)

  useEffect(() => {
    _initSocket()
    _initEngine()

    return () => {
      console.log('Destroying socket and engine due to unmount')
      socket?.disconnect()
      engine?.destroy()
    }
  }, [])

  const _initSocket = async () => {
    // console.log('Initializing socket...')
    const currentUser = auth().currentUser
    const token = await currentUser?.getIdToken()

    const _socket = io(SOCKET_URL, {
      query: {
        token
      }
    })

    // Set the socket for later operations and emits
    // console.log('Socket created!', _socket)
    setSocket(_socket)
  }

  const _initEngine = async () => {
    // console.log('Initializing engine...')
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
      }

      // Create a new instance of the agora engine
      const _engine = await RtcEngine.create(APP_ID)

      // Set it to work on the background
      await _engine?.setParameters('{"che.audio.opensl":true}')
      await _engine?.enableAudioVolumeIndication(200, 10, true)

      // Enable video module and set up video encoding configs
      await _engine.enableVideo();

      // Make this room live broadcasting room
      await _engine.setChannelProfile(ChannelProfile.LiveBroadcasting);

      // Set client role as audience by default, the header would handle the set client role to broadcaster if necessary
      await _engine.setClientRole(ClientRole.Audience)

      // Set audio route to speaker
      await _engine.setDefaultAudioRoutetoSpeakerphone(true);


      // Set the engine in the reducer for actions like switch camera, leave channel etc
      // console.log('Engine created!', _engine)
      setEngine(_engine)
    } catch (error) {
      console.log(error)
    }
  }

  const _initSocketListeners = async () => {
    // console.log('Initializing socket listeners...')
    socket?.on('stream-updated', _onStreamUpdated)
    socket?.on('connect_error', () => {
      openSnackbar({
        primary: 'Connection is slow',
        secondary: 'Reconnecting...',
        type: 'WARNING'
      })
    })
    socket?.on('disconnect', () => console.log('Socket disconnected'))
    socket?.on('connect', () => console.log('Socket connected!'))
    socket?.on('reconnection_attempt', () => console.log('Socket reconnecting...'))

    // console.log('Socket listeners initialized!')
  }

  const _initEngineListeners = () => {
    // console.log('Initializing engine listeners...')
    // engine?.instance

    // Init the engine listeners and their handlers
    engine?.addListener('Warning', _onWarning)
    engine?.addListener('Error', _onError)
    engine?.addListener('UserJoined', _onSpeakerJoined)
    engine?.addListener('UserOffline', _onSpeakerLeft)
    engine?.addListener('JoinChannelSuccess', _onJoinedSuccess)
    engine?.addListener('LeaveChannel', _onLeftStream)
    engine?.addListener('ActiveSpeaker', _onActiveSpeakerChanged)
    engine?.addListener('LocalVideoStateChanged', _onLocalVideoStateChanged)
    engine?.addListener('LocalAudioStateChanged', _onLocalAudioStateChanged)
    engine?.addListener('RemoteVideoStateChanged', _onRemoteVideoStateChanged)
    engine?.addListener('RemoteAudioStateChanged', _onRemoteAudioStateChanged)
    engine?.addListener('ClientRoleChanged', _onClientRoleChanged)

    // console.log('Engine listeners initialized!', engine)
  }

  // #################################################################
  // #################################################################
  // #################################################################
  // Event handlers
  // #################################################################
  // #################################################################
  // #################################################################
  const _onLeftStream = (stats) => {
    console.log('LEFT STREAM SUCCESSFULLY')
    socket?.emit('leave-stream', ({ streamID }))
    engine?.removeAllListeners()
    // TODO: remove listeners from socket

    dispatch({
      type: LEFT_STREAM
    })
    refetchStreams()
  }

  const _onJoinedSuccess = async (streamID: string) => {
    console.log('JOINED SUCCESSFULLY', streamID)
    // Initially, client will manually fetch the stream data
    socket?.emit('join-stream', ({ streamID }))
    const stream = await API.Streams.getStreamByID(streamID)

    dispatch({
      type: JOINED_STREAM,
      payload: stream
    })
  }

  const _onError = (error: ErrorCode) => {
    console.log('ERROR', error)
    openSnackbar({
      primary: 'Error',
      secondary: utils.Stream.engineErrorMessage(error),
      type: 'ERROR'
    })
  }

  const _onWarning = (warning: WarningCode) => {
    console.log('WARNING', warning)
    openSnackbar({
      primary: 'Warning',
      secondary: utils.Stream.engineWarningMessage(warning),
      type: 'WARNING'
    })
  }

  const _onSpeakerJoined = async (speakerID: number) => {
    console.log('SPEAKER JOINED', speakerID)
    const speaker = await API.Users.getUserByStreamID(speakerID)
    dispatch({
      type: SPEAKER_JOINED,
      payload: speaker
    })
  }

  const _onSpeakerLeft = async (speakerID: number) => {
    console.log('SPEAKER LEFT', speakerID)
    dispatch({
      type: SPEAKER_LEFT,
      payload: speakerID
    })
  }

  const _onRemoteAudioStateChanged = (speakerID: number, newState: number) => {
    dispatch({
      type: SPEAKER_AUDIO_STATE_CHANGED,
      payload: { speakerID, newState }
    })
  }

  const _onRemoteVideoStateChanged = (speakerID: number, newState: number) => {
    dispatch({
      type: SPEAKER_VIDEO_STATE_CHANGED,
      payload: { speakerID, newState }
    })
  }

  const _onLocalVideoStateChanged = (newState, oldState) => {
    dispatch({
      type: SPEAKER_VIDEO_STATE_CHANGED,
      payload: {
        speakerID: user?.streamID,
        newState,
      }
    })
  }

  const _onLocalAudioStateChanged = (newState, oldState) => {
    dispatch({
      type: SPEAKER_AUDIO_STATE_CHANGED,
      payload: {
        speakerID: user?.streamID,
        newState,
      }
    })
  }

  const _onClientRoleChanged = (oldRole, newRole) => {
    const isSpeaker = newRole === 1
    dispatch({
      type: SET_ROLE,
      payload: newRole
    })

    if (isSpeaker) {
      _onSpeakerJoined(user?.streamID)
    } else {
      _onSpeakerLeft(user?.streamID)
    }
  }

  const _onActiveSpeakerChanged = (speakerID: number) => {
    setActiveSpeaker(speakerID)
  }

  const _onStreamUpdated = (data: Stream) => {
    console.log('STREAM UPDATED')
    dispatch({
      type: STREAM_UPDATED,
      payload: data
    })
  }

  // #################################################################
  // #################################################################
  // #################################################################
  // Public functions
  // #################################################################
  // #################################################################
  // #################################################################
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

  const joinStream = async (streamID: string) => {
    _initEngineListeners()
    _initSocketListeners()

    // Check the current users client role, and set it before joining the stream
    const { onStage, owners } = await API.Streams.getStreamByID(streamID)
    const isSpeaker = onStage?.includes(user?._id) || owners?.includes(user?._id)
    await updateClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)

    const token = await API.Streams.getStreamToken(streamID)
    await engine?.joinChannel(
      token,
      streamID,
      null,
      user?.streamID,
      undefined
    );
  }

  const leaveStream = async () => {
    await engine?.leaveChannel()
  }

  const setActiveSpeaker = (speakerID: number) => {
    console.log('ACTIVE SPEAKER CHANGED', speakerID)

    dispatch({
      type: ACTIVE_SPEAKER_UPDATED,
      payload: speakerID
    })
  }

  const raiseHand = () => socket?.emit('raise-hand', ({ streamID }))
  const unraiseHand = () => socket?.emit('unraise-hand', ({ streamID }))
  const endStream = () => socket?.emit('end-stream', ({ streamID }))

  return (
    <StreamMembersContext.Provider
      value={{
        socket,
        streamID,
        audience,
        members,
        raisedHands,
        onStage,
        owners,
        isLive,
        meta,
        isJoined,
        engine,
        speakers,
        audioMuted,
        videoMuted,
        activeSpeaker,
        role,
        leaveStream,
        joinStream,
        raiseHand,
        unraiseHand,
        endStream,
        updateClientRole,
        setActiveSpeaker
      }}
    >
      {children}
    </StreamMembersContext.Provider>
  )
}
