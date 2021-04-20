import React, { createContext, useEffect, useRef, useState } from 'react'
import RtcEngine, { ChannelProfile, ClientRole } from 'react-native-agora'
import { io, Socket } from 'socket.io-client'
import auth from '@react-native-firebase/auth'
import { SOCKET_URL } from '../API/API'
import { useDispatch } from 'react-redux'
import { joinStream, leftStream, membersUpdated, speakerAudioStateUpdated, speakerJoined, speakerLeft, speakerVideoStateUpdated, streamUpdated } from '../slices/stream'
import { useUser } from '../hooks/useUser'

const APP_ID = 'af6ff161187b4527ac35d01f200f7980'

export const StreamContext = createContext()

export default function StreamProvider({ children }) {
  const [engine, setEngine] = useState<RtcEngine | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)
  const { user } = useUser()

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

    setSocket(_socket)
  }

  const _initEngine = async () => {
    const _engine = await RtcEngine.create(APP_ID)
    await _engine?.setParameters('{"che.audio.opensl":true}')
    await _engine?.enableAudioVolumeIndication(200, 10, true)
    await _engine?.setChannelProfile(ChannelProfile.LiveBroadcasting)
    await _engine?.setClientRole(ClientRole.Audience)

    console.log('Initializing engine...')

    setEngine(_engine)
  }

  return (
    <StreamContext.Provider value={{ engine, socket }}>
      {children}
    </StreamContext.Provider>
  )
}
