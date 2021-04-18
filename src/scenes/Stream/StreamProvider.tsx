import React, { createContext, useEffect, useRef, useState } from 'react'
import RtcEngine from 'react-native-agora'
import { io, Socket } from 'socket.io-client'
import auth from '@react-native-firebase/auth'
import { SOCKET_URL } from '../../API/API'

const APP_ID = 'af6ff161187b4527ac35d01f200f7980'

export const StreamContext = createContext()

export default function StreamProvider({ children }) {
  const [engine, setEngine] = useState<RtcEngine | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    _initEngine()
    _initSocket()

    return () => engine?.current?.destroy()
  }, [])

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

    setSocket(_socket)
  }

  const _initEngine = async () => {
    const _engine = await RtcEngine.create(APP_ID)

    console.log('Initializing engine...')
    await _engine?.setParameters('{"che.audio.opensl":true}')
    await _engine?.enableAudioVolumeIndication(200, 10, true)

    // Apply listeners

    setEngine(_engine)
  }

  console.log(socket)

  return (
    <StreamContext.Provider value={{ engine, socket }}>
      {children}
    </StreamContext.Provider>
  )
}
