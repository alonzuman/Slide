import React, { createContext, useEffect, useRef, useState } from 'react'
import RtcEngine, { ChannelProfile, ClientRole } from 'react-native-agora'
import { io, Socket } from 'socket.io-client'
import auth from '@react-native-firebase/auth'
import { SOCKET_URL } from '../../API/API'
import { useDispatch } from 'react-redux'
import { joinStream, leftStream, membersUpdated, speakerAudioStateUpdated, speakerJoined, speakerLeft, speakerVideoStateUpdated, streamUpdated } from '../../slices/stream'
import { useUser } from '../../hooks/useUser'

const APP_ID = 'af6ff161187b4527ac35d01f200f7980'

export const StreamContext = createContext()

export default function StreamProvider({ children }) {
  const [engine, setEngine] = useState<RtcEngine | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)
  const { data: user } = useUser()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user?._id) {
      _initEngine()
      _initSocket()
    }

    return () => {
      engine?.destroy()
      socket?.disconnect()
    }
  }, [user?._id])

  const _initSocket = async () => {
    if (socket) return null;
    console.log('Initializing socket...')
    const currentUser = auth().currentUser
    const token = currentUser && await currentUser.getIdToken()

    const _socket = io(SOCKET_URL, {
      query: {
        token
      }
    })

    // Apply listeners
    _socket?.on('members-updated', ({ members, audience }) => dispatch(membersUpdated({ members, audience })))
    _socket?.on('stream-updated', (data) => dispatch(streamUpdated({ ...data })))

    setSocket(_socket)
  }

  const _initEngine = async () => {
    const _engine = await RtcEngine.create(APP_ID)
    await _engine?.setParameters('{"che.audio.opensl":true}')
    await _engine?.enableAudioVolumeIndication(200, 10, true)
    await _engine?.setChannelProfile(ChannelProfile.LiveBroadcasting)
    await _engine?.setClientRole(ClientRole.Audience)

    console.log('Initializing engine...')
    // Apply listeners
    _engine?.addListener('UserJoined', (speakerID) => dispatch(speakerJoined({ speakerID })))
    _engine?.addListener('UserOffline', (speakerID) => dispatch(speakerLeft({ speakerID })))
    _engine?.addListener('JoinChannelSuccess', (streamID) => dispatch(joinStream({ streamID })))
    _engine?.addListener('LeaveChannel', (stats) => dispatch(leftStream()))
    _engine?.addListener('LocalVideoStateChanged', (state) => dispatch(speakerVideoStateUpdated({ speakerID: user?.streamID, isMuted: state === 0 })))
    _engine?.addListener('RemoteVideoStateChanged', (speakerID, state) => dispatch(speakerVideoStateUpdated({ speakerID, isMuted: state === 0 })))
    _engine?.addListener('RemoteVideoStateChanged', (speakerID, state) => console.log('VIDEO CHANGED', speakerID, state))
    _engine?.addListener('RemoteAudioStateChanged', (speakerID, state) => dispatch(speakerAudioStateUpdated({ speakerID, isMuted: state === 0 })))
    _engine?.addListener('RemoteAudioStateChanged', (speakerID, state) => console.log('Audio CHANGED', speakerID, state))

    setEngine(_engine)
  }

  return (
    <StreamContext.Provider value={{ engine, socket }}>
      {children}
    </StreamContext.Provider>
  )
}
