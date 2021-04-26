import React, { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import auth from '@react-native-firebase/auth'
import { SOCKET_URL } from '../API/API'

export const SocketContext = createContext()

export default function SocketProvider({ children }: { children: any }) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    _initSocket()

    return () => socket?.disconnect()
  }, [])


  const _initSocket = async () => {
    console.log('Initializing socket...')
    const currentUser = auth().currentUser
    const token = await currentUser?.getIdToken()

    const _socket = io(SOCKET_URL, {
      query: {
        token
      }
    })

    // Set the socket for later operations and emits
    setSocket(_socket)
  }

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
