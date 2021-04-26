import React, { useContext } from 'react'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../providers/SocketProvider'

export default function useSocket() {
  return useContext(SocketContext) as Socket | null
}
