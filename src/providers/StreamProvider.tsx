import React, { createContext } from 'react'
import API from '../API/API'
import { useUser } from '../hooks/useUser'
import { AudienceLatencyLevelType, BeautyOptions, ClientRole, ErrorCode, VideoFrameRate, VideoOutputOrientationMode, WarningCode } from 'react-native-agora'
import { useQuery } from 'react-query'
import useSnackbar from '../hooks/useSnackbar'
import utils from '../utils'
import { Stream } from '../types'
import useEngine from '../hooks/useEngine'
import useSocket from '../hooks/useSocket'
import { useAppDispatch } from '../store'
import { activeSpeakerUpdated, joinedStream, leftStream, setRole, speakerAudioStateChanged, speakerJoined, speakerLeft, speakerVideoStateChanged, streamUpdated } from '../slices/stream'
import { useStreamID } from '../hooks/useStream'

export const StreamMembersContext = createContext()

export default function StreamProvider({ children }: { children?: any }) {
  const { openSnackbar } = useSnackbar()
  const { refetch: refetchStreams } = useQuery('streams', API.Streams.fetchLiveStreams)
  const { user, updateUser } = useUser()
  const socket = useSocket()
  const engine = useEngine()
  const streamID = useStreamID()
  const appDispatch = useAppDispatch()

  // console.log('re-rendered provider', user?.name, Date.now())

  const _initSocketListeners = async () => {
    // Init the socket listeners
    socket?.on('stream-updated', _onStreamUpdated)
    socket?.on('connect_error', _onSocketConnectError)
    socket?.on('disconnect', () => _onSocketDisconnected)
    socket?.on('connect', () => _onSocketConnected)
    socket?.on('reconnection_attempt', () => _onSocketReconnecting)
  }

  const _initEngineListeners = () => {
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
    engine?.addListener('RemoteVideoStateChanged', _onSpeakerVideoStateChanged)
    engine?.addListener('RemoteAudioStateChanged', _onSpeakerAudioStateChanged)
    engine?.addListener('ClientRoleChanged', _onClientRoleChanged)
    engine?.addListener('TokenPrivilegeWillExpire', _onTokenWillExpire)
  }

  // #################################################################
  // #################################################################
  // #################################################################
  // Event handlers
  // #################################################################
  // #################################################################
  // #################################################################
  const _onTokenWillExpire = async () => {
    // Rejoin the stream using the new token from the DB
    console.log('TOKEN IS ABOUT TO EXPIRE')
    const token = await API.Streams.getStreamToken(streamID)
    engine?.renewToken(token)
  }

  const _removeAllListeners = () => {
    socket?.off('stream-updated')
    socket?.off('connect_error')
    socket?.off('disconnect')
    socket?.off('connect')
    socket?.off('reconnection_attempt')
    engine?.removeAllListeners()
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
    console.log('ERROR', error, user?.name)
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
    console.log('WARNING', warning, user?.name)
    const secondary = utils.Stream.engineWarningMessage(warning)
    if (secondary) {
      openSnackbar({
        primary: 'Warning',
        secondary,
        type: 'WARNING'
      })
    }
  }

  const _onJoinedSuccess = async (streamID: string) => {
    console.log('JOINED SUCCESSFULLY', streamID, user?.name)
    // Initially, client will manually fetch the stream data
    socket?.emit('join-stream', ({ streamID }))
    const stream = await API.Streams.getStreamByID(streamID)

    appDispatch(joinedStream(stream))
  }

  const _onLeftSuccess = (stats) => {
    console.log('LEFT STREAM SUCCESSFULLY', user?.name)
    socket?.emit('leave-stream', ({ streamID }))

    appDispatch(leftStream())

    _removeAllListeners()
    refetchStreams()
  }

  const _onSpeakerJoined = async (speakerID: number) => {
    console.log('SPEAKER JOINED', speakerID, user?.name)
    const speaker = await API.Users.getUserByStreamID(speakerID)

    appDispatch(speakerJoined(speaker))
  }

  const _onSpeakerLeft = async (speakerID: number) => {
    console.log('SPEAKER LEFT', speakerID, user?.name)
    appDispatch(speakerLeft(speakerID))
  }

  const _onSpeakerAudioStateChanged = (speakerID: number, newState: number) => {
    appDispatch(speakerAudioStateChanged({ speakerID, newState }))
  }

  const _onSpeakerVideoStateChanged = (speakerID: number, newState: number) => {
    appDispatch(speakerVideoStateChanged({ speakerID, newState }))
  }

  const _onLocalVideoStateChanged = (newState, oldState) => {
    console.log('LOCAL VIDEO STATE CHANGED', user?.name)
    appDispatch(speakerVideoStateChanged({ speakerID: user?.streamID, newState }))
  }

  const _onLocalAudioStateChanged = (newState, oldState) => {
    console.log('LOCAL AUDIO STATE CHANGED', user?.name)
    appDispatch(speakerAudioStateChanged({ speakerID: user?.streamID, newState }))
  }

  const _onClientRoleChanged = (oldRole, newRole) => {
    const isSpeaker = newRole === 1
    appDispatch(setRole(newRole))

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
    console.log('STREAM UPDATED', user?.name)
    appDispatch(streamUpdated(data))
  }

  // #################################################################
  // #################################################################
  // #################################################################
  // Public functions
  // #################################################################
  // #################################################################
  // #################################################################

  const joinStream = async (newStreamID: string) => {
    console.log('JOINING A NEW STREAM', user?.name)
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

  const leaveStream = async () => {
    await engine?.leaveChannel()
  }

  const switchStream = async (newStreamID: string) => {
    console.log('SWITCHING STREAM', user?.name)

    // Check the current users client role, and set it before joining the stream
    const { onStage, owners } = await API.Streams.getStreamByID(newStreamID)
    const isSpeaker = onStage?.includes(user?._id) || owners?.includes(user?._id)
    await updateClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)

    const token = await API.Streams.getStreamToken(newStreamID)
    await engine?.switchChannel(token, newStreamID)
  }

  const updateClientRole = async (role: ClientRole) => {
    console.log('UPDATING CLIENT ROLE', user?.name)

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

  const refetchStream = async () => {
    console.log('REFETCHED STREAM', user?.name)
    const stream = await API.Streams.getStreamByID(streamID)
    appDispatch(streamUpdated(stream))
  }

  const setActiveSpeaker = (speakerID: number) => {
    console.log('ACTIVE SPEAKER CHANGED', speakerID, user?.name)
    appDispatch(activeSpeakerUpdated(speakerID))
  }

  const sendStreamInvite = async (userID: string) => {
    socket?.emit('send-invite', ({ streamID, userID }))
  }

  const raiseHand = () => {
    socket?.emit('raise-hand', ({ streamID }))
  }

  const unraiseHand = () => {
    socket?.emit('unraise-hand', ({ streamID }))
  }

  const endStream = () => {
    socket?.emit('end-stream', ({ streamID }))
  }

  const muteLocalAudio = () => {
    console.log('MUTING LOCAL AUDIO', user?.name)
    engine?.enableLocalAudio(false)
    engine?.muteLocalAudioStream(true)
  }

  const muteLocalVideo = () => {
    console.log('MUTING LOCAL VIDEO', user?.name)
    engine?.enableLocalVideo(false)
    engine?.muteLocalVideoStream(true)
  }

  const unMuteLocalAudio = () => {
    console.log('UNMUTING LOCAL AUDIO', user?.name)
    engine?.enableLocalAudio(true)
    engine?.muteLocalAudioStream(false)
  }

  const unMuteLocalVideo = () => {
    console.log('UNMUTING LOCAL VIDEO', user?.name)
    engine?.enableLocalVideo(true)
    engine?.muteLocalVideoStream(false)
  }

  const switchCamera = () => {
    engine?.switchCamera()
  }

  const makeSpeaker = (oldStage: string[], userID: string) => {
    const updatedStage = [...oldStage, userID]
    socket?.emit('update-stream', ({ streamID, onStage: updatedStage }))
  }

  const makeAudience = (oldStage: string[], userID: string) => {
    const updatedStage = [...oldStage?.filter(v => v !== userID)]
    socket?.emit('update-stream', ({ streamID, onStage: updatedStage }))
  }

  const updateBeautyOptions = (options: BeautyOptions) => {
    updateUser({
      config: {
        stream: options
      }
    })
    engine?.setBeautyEffectOptions(true, options)
  }

  return (
    <StreamMembersContext.Provider
      value={{
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
        updateBeautyOptions
      }}
    >
      {children}
    </StreamMembersContext.Provider>
  )
}
