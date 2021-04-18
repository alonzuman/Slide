import React, { useContext } from 'react'
import RtcEngine from 'react-native-agora'
import { Socket } from 'socket.io-client'
import { StreamContext } from '../scenes/Stream/StreamProvider'

export const useStreamProvider = () => {
  return useContext(StreamContext) as { engine: RtcEngine, socket: Socket }
}
