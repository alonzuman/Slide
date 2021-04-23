import React, { createContext, useEffect, useReducer } from 'react'
import { io, Socket } from 'socket.io-client'
import API, { SOCKET_URL } from '../API/API'
import { useUser } from '../hooks/useUser'
import auth from '@react-native-firebase/auth'
import stream, { ACTIVE_SPEAKER_UPDATED, initialState, JOINED_STREAM, LEFT_STREAM, SET_ENGINE, SET_ROLE, SET_SOCKET, SPEAKER_AUDIO_STATE_CHANGED, SPEAKER_JOINED, SPEAKER_LEFT, SPEAKER_VIDEO_STATE_CHANGED, STREAM_UPDATED } from '../reducers/stream'
import { PermissionsAndroid, Platform } from 'react-native'
import RtcEngine, { AudienceLatencyLevelType, ChannelProfile, ClientRole, VideoFrameRate, VideoOutputOrientationMode } from 'react-native-agora'
import { useQuery } from 'react-query'

type State = {
  socket: Socket | null,
  engine: RtcEngine | null
}


const APP_ID = 'af6ff161187b4527ac35d01f200f7980'
export const StreamMembersContext = createContext()

export default function StreamProvider({ children }: { childrne?: any }) {
  const { refetch: refetchStreams } = useQuery('streams', API.Streams.fetchLiveStreams)
  const { user } = useUser()
  const [{
    socket,
    streamID,
    audience,
    meta,
    members,
    raisedHands,
    onStage,
    owners,
    isLive,
    isJoined,
    engine,
    speakers,
    audioMuted,
    videoMuted,
    activeSpeaker,
    role
  }, dispatch] = useReducer<State>(stream, initialState)

  useEffect(() => {
    _initSocket()

    return () => {
      socket?.disconnect()
      console.log('Socket destroyed...')
    }
  }, [user?._id])

  useEffect(() => {
    _initEngine()

    return () => {
      engine?.destroy()
      console.log('Engine destroyed...')
    }
  }, [])

  const _initSocket = async () => {
    if (!user?._id) return;

    // console.log('Initializing socket...')
    const currentUser = auth().currentUser
    const token = await currentUser?.getIdToken()

    const _socket = io(SOCKET_URL, {
      query: {
        token
      }
    })

    _socket?.on('stream-updated', _onStreamUpdated)
    dispatch({ type: SET_SOCKET, payload: _socket })
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
      const _engine = await RtcEngine.create(APP_ID)
      dispatch({
        type: SET_ENGINE,
        payload: _engine
      })

      // Init the engine listeners and their handlers
      _engine?.addListener('Warning', _onWarning)
      _engine?.addListener('Error', _onError)
      _engine?.addListener('UserJoined', _onSpeakerJoined)
      _engine?.addListener('UserOffline', _onSpeakerLeft)
      _engine?.addListener('JoinChannelSuccess', _onJoinedSuccess)
      _engine?.addListener('LeaveChannel', _onLeftStream)
      _engine?.addListener('ActiveSpeaker', _onActiveSpeakerChanged)
      _engine?.addListener('LocalVideoStateChanged', _onLocalVideoStateChanged)
      _engine?.addListener('LocalAudioStateChanged', _onLocalAudioStateChanged)
      _engine?.addListener('RemoteVideoStateChanged', _onRemoteVideoStateChanged)
      _engine?.addListener('RemoteAudioStateChanged', _remoteAudioStateChanged)
      _engine?.addListener('ClientRoleChanged', _onClientRoleChanged)

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
    } catch (error) {
      console.log(error)
    }
  }

  // #################################################################
  // #################################################################
  // #################################################################
  // Event handlers
  // #################################################################
  // #################################################################
  // #################################################################
  const _onError = (error) => {
    console.log('ERROR', error)
  }

  const _onWarning = (warning) => {
    console.log('WARNING', warning)
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

  const _onLeftStream = (stats) => {
    console.log('LEFT STREAM')
    dispatch({
      type: LEFT_STREAM
    })
  }

  const _onJoinedSuccess = (streamID: string) => {
    console.log('JOINED SUCCESSFULLY', streamID)

    dispatch({
      type: JOINED_STREAM,
      payload: { streamID }
    })
  }

  const _remoteAudioStateChanged = (speakerID: number, newState: number) => {
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

  const _onStreamUpdated = (data) => {
    console.log('STREAM UPDATED')
    dispatch({
      type: STREAM_UPDATED,
      payload: data
    })
  }

  const _onActiveSpeakerChanged = (speakerID: number) => {
    setActiveSpeaker(speakerID)
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

    const stream = await API.Streams.getStreamByID(streamID)
    socket?.emit('join-stream', ({ streamID }))

    // Manually fetch the stream in case socket or engine delays a little
    dispatch({
      type: JOINED_STREAM,
      payload: stream
    })
  }

  const leaveStream = async () => {
    await engine?.leaveChannel()
    socket?.emit('leave-stream', ({ streamID }))
    dispatch({
      type: LEFT_STREAM
    })
    refetchStreams()
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
