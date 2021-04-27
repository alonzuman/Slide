import React, { createContext, useReducer } from 'react'
import API from '../API/API'
import { useUser } from '../hooks/useUser'
import stream, { ACTIVE_SPEAKER_UPDATED, initialState, JOINED_STREAM, LEFT_STREAM, SET_ROLE, SPEAKER_AUDIO_STATE_CHANGED, SPEAKER_JOINED, SPEAKER_LEFT, SPEAKER_VIDEO_STATE_CHANGED, STREAM_UPDATED } from '../reducers/stream'
import { AudienceLatencyLevelType, ClientRole, ErrorCode, VideoFrameRate, VideoOutputOrientationMode, WarningCode } from 'react-native-agora'
import { useQuery } from 'react-query'
import useSnackbar from '../hooks/useSnackbar'
import utils from '../utils'
import { Stream } from '../types'
import useEngine from '../hooks/useEngine'
import useSocket from '../hooks/useSocket'
import { useSetStreamMembers, useSetStreamMeta, useSetStreamAudience, useStreamSpeakers } from '../hooks/useStream'

export const StreamMembersContext = createContext()

export default function StreamProvider({ children }: { children?: any }) {
  const { openSnackbar } = useSnackbar()
  const { refetch: refetchStreams } = useQuery('streams', API.Streams.fetchLiveStreams)
  const { user } = useUser()
  const socket = useSocket()
  const engine = useEngine()
  const [{
    streamID,
    audience,
    meta,
    members,
    raisedHands,
    onStage,
    owners,
    isLive,
    invites,
    isJoined,
    speakers,
    audioMuted,
    videoMuted,
    activeSpeaker,
    role
  }, dispatch] = useReducer(stream, initialState)
  const setStreamMeta = useSetStreamMeta()
  const setStreamMembers = useSetStreamMembers()
  const setStreamAudience = useSetStreamAudience()
  const [streamSpeakers, setStreamSpeakers] = useStreamSpeakers()

  const _initSocketListeners = async () => {
    // console.log('Initializing socket listeners...')
    socket?.on('stream-updated', _onStreamUpdated)
    socket?.on('connect_error', _onSocketConnectError)
    socket?.on('disconnect', () => _onSocketDisconnected)
    socket?.on('connect', () => _onSocketConnected)
    socket?.on('reconnection_attempt', () => _onSocketReconnecting)

    // console.log('Socket listeners initialized!')
  }

  const _initEngineListeners = () => {
    // console.log('Initializing engine listeners...')
    // engine?.instance

    // Init the engine listeners and their handlers
    engine?.addListener('Warning', _onEngineWarning)
    engine?.addListener('Error', _onEngineError)
    engine?.addListener('UserJoined', _onSpeakerJoined)
    engine?.addListener('UserOffline', _onSpeakerLeft)
    engine?.addListener('JoinChannelSuccess', _onJoinedSuccess)
    engine?.addListener('LeaveChannel', _onLeftSuccess)
    engine?.addListener('ActiveSpeaker', _onActiveSpeakerChanged)
    engine?.addListener('LocalVideoStateChanged', _onLocalVideoStateChanged)
    engine?.addListener('LocalAudioStateChanged', _onLocalAudioStateChanged)
    engine?.addListener('RemoteVideoStateChanged', _onRemoteVideoStateChanged)
    engine?.addListener('RemoteAudioStateChanged', _onRemoteAudioStateChanged)
    engine?.addListener('ClientRoleChanged', _onClientRoleChanged)
    engine?.addListener('TokenPrivilegeWillExpire', _onTokenWillExpire)

    // console.log('Engine listeners initialized!', engine)
  }

  // #################################################################
  // #################################################################
  // #################################################################
  // Event handlers
  // #################################################################
  // #################################################################
  // #################################################################
  const _onTokenWillExpire = () => {
    // TODO: Get a new token from the DB
    // Rejoin the stream using the new token from the DB
  }

  const _onLeftSuccess = (stats) => {
    console.log('LEFT STREAM SUCCESSFULLY')
    socket?.emit('leave-stream', ({ streamID }))

    setStreamMeta({
      name: '',
      description: '',
      imageURL: '',
      streamID: '',
    })
    setStreamMembers([])
    setStreamAudience([])

    dispatch({
      type: LEFT_STREAM
    })

    _removeAllListeners()
    refetchStreams()
  }

  const _removeAllListeners = () => {
    socket?.off('stream-updated')
    socket?.off('connect_error')
    socket?.off('disconnect')
    socket?.off('connect')
    socket?.off('reconnection_attempt')
    engine?.removeAllListeners()
  }

  const _onJoinedSuccess = async (streamID: string) => {
    console.log('JOINED SUCCESSFULLY', streamID)
    // Initially, client will manually fetch the stream data
    socket?.emit('join-stream', ({ streamID }))
    const stream = await API.Streams.getStreamByID(streamID)

    setStreamMeta(stream?.meta)
    setStreamMembers(stream?.members)
    setStreamAudience(stream?.audience)

    dispatch({
      type: JOINED_STREAM,
      payload: stream
    })
  }

  const _onSocketReconnecting = () => {
    openSnackbar({
      primary: 'Connection is slow',
      secondary: 'Reconnecting...',
      type: 'WARNING'
    })
  }

  const _onSocketDisconnected = () => { }

  const _onSocketConnected = () => { }

  const _onSocketConnectError = () => {
    openSnackbar({
      primary: 'Error',
      secondary: 'Connection error',
      type: 'ERROR'
    })
  }

  const _onEngineError = (error: ErrorCode) => {
    console.log('ERROR', error)
    const secondary = utils.Stream.engineErrorMessage(error)

    if (secondary) {
      openSnackbar({
        primary: 'Error',
        secondary,
        type: 'ERROR'
      })
    }
  }

  const _onEngineWarning = (warning: WarningCode) => {
    console.log('WARNING', warning)
    const secondary = utils.Stream.engineWarningMessage(warning)
    if (secondary) {
      openSnackbar({
        primary: 'Warning',
        secondary,
        type: 'WARNING'
      })
    }
  }

  const _onSpeakerJoined = async (speakerID: number) => {
    console.log('SPEAKER JOINED', speakerID)
    setStreamSpeakers(oldSpeakers => oldSpeakers?.includes(speakerID) ? [...streamSpeakers] : [...streamSpeakers, speakerID])

    // TODO: remove this
    const speaker = await API.Users.getUserByStreamID(speakerID)

    dispatch({
      type: SPEAKER_JOINED,
      payload: speaker
    })
  }

  const _onSpeakerLeft = async (speakerID: number) => {
    console.log('SPEAKER LEFT', speakerID)
    setStreamSpeakers(oldSpeakers => oldSpeakers?.filter(v => v !== speakerID))

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
    // TODO: break it down to specific events
    setStreamAudience(data?.audience)
    setStreamMembers(data?.members)
    setStreamMeta({
      name: data?.meta?.name,
      description: data?.meta?.description,
      imageURL: data?.meta?.imageURL,
      streamID: data?._id,
    })

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

  const joinStream = async (newStreamID: string) => {
    console.log('JOINING A NEW STREAM')
    _initEngineListeners()
    _initSocketListeners()

    // Check the current users client role, and set it before joining the stream
    const { onStage, owners } = await API.Streams.getStreamByID(newStreamID)
    const isSpeaker = onStage?.includes(user?._id) || owners?.includes(user?._id)
    await updateClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)

    const token = await API.Streams.getStreamToken(newStreamID)

    await engine?.joinChannel(
      token,
      newStreamID,
      null,
      user?.streamID,
      undefined
    );
  }

  const switchStream = async (newStreamID: string) => {
    console.log('SWITCHING STREAM')

    // Check the current users client role, and set it before joining the stream
    const { onStage, owners } = await API.Streams.getStreamByID(newStreamID)
    const isSpeaker = onStage?.includes(user?._id) || owners?.includes(user?._id)
    await updateClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)

    const token = await API.Streams.getStreamToken(newStreamID)
    await engine?.switchChannel(token, newStreamID)
  }

  const updateClientRole = async (role: ClientRole) => {
    console.log('UPDATING CLIENT ROLE')

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
  }

  const leaveStream = async () => {
    await engine?.leaveChannel()
  }

  const refetchStream = async () => {
    console.log('REFETCHED STREAM')
    const stream = await API.Streams.getStreamByID(streamID)

    dispatch({
      type: STREAM_UPDATED,
      payload: stream
    })
  }

  const setActiveSpeaker = (speakerID: number) => {
    console.log('ACTIVE SPEAKER CHANGED', speakerID)

    dispatch({
      type: ACTIVE_SPEAKER_UPDATED,
      payload: speakerID
    })
  }

  const sendStreamInvite = async (userID: string) => socket?.emit('send-invite', ({ streamID, userID }))
  const raiseHand = () => socket?.emit('raise-hand', ({ streamID }))
  const unraiseHand = () => socket?.emit('unraise-hand', ({ streamID }))
  const endStream = () => socket?.emit('end-stream', ({ streamID }))

  const muteLocalAudio = () => {
    console.log('MUTING LOCAL AUDIO')
    engine?.enableLocalAudio(false)
    engine?.muteLocalAudioStream(true)
  }

  const muteLocalVideo = () => {
    console.log('MUTING LOCAL VIDEO')
    engine?.enableLocalVideo(false)
    engine?.muteLocalVideoStream(true)
  }

  const unMuteLocalAudio = () => {
    console.log('UNMUTING LOCAL AUDIO')
    engine?.enableLocalAudio(true)
    engine?.muteLocalAudioStream(false)
  }

  const unMuteLocalVideo = () => {
    console.log('UNMUTING LOCAL VIDEO')
    engine?.enableLocalVideo(true)
    engine?.muteLocalVideoStream(false)
  }

  const switchCamera = () => {
    engine?.switchCamera()
  }

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
        invites,
        videoMuted,
        activeSpeaker,
        role,
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
        sendStreamInvite
      }}
    >
      {children}
    </StreamMembersContext.Provider>
  )
}
