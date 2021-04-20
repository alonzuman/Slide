import React, { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { SOCKET_URL } from '../API/API'
import { useUser } from '../hooks/useUser'
import auth from '@react-native-firebase/auth'
import useStreamMeta from '../hooks/useStreamMeta'

export const StreamMembersContext = createContext()

export default function StreamMembersProvider({ children }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const { streamID, meta, setMeta } = useStreamMeta()
  const { user } = useUser()
  const [store, setStore] = useState({
    audience: [],
    members: [],
    owners: [],
    raisedHands: [],
    onStage: []
  })
  const { audience, owners, members, raisedHands, onStage } = store;

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

  useEffect(() => {
    if (user?._id) {
      _initSocket()
    }

    return () => {
      socket?.emit('leave-stream', ({ streamID }))
      socket?.off('members-updated')
    }
  }, [user?._id, streamID])

  const initListeners = () => {
    console.log('Initializing socket listeners...')
    // Apply listeners
    socket?.on('members-updated', ({ members, audience, raisedHands, onStage, owners }) => {
      setStore({ ...store, members, audience, raisedHands, onStage, owners })
    })

    socket?.on('stream-ended', () => setMeta({ ...meta, isLive: false }))
  }

  const clearListeners = () => {
    socket?.off('members-updated')
    socket?.off('stream-ended')
  }

  const raiseHand = () => socket?.emit('raise-hand', ({ streamID }))
  const unraiseHand = () => socket?.emit('unraise-hand', ({ streamID }))

  return (
    <StreamMembersContext.Provider
      value={{
        socket,
        audience,
        members,
        raisedHands,
        onStage,
        owners,
        raiseHand,
        unraiseHand,
        setStore,
        initListeners,
        clearListeners
      }}
    >
      {children}
    </StreamMembersContext.Provider>
  )
}
