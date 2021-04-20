import React, { createContext, useEffect, useState } from 'react'
import { useStreamProvider } from '../hooks/useStreamProvider'

export const StreamMembersContext = createContext()

export default function StreamMembersProvider({ children }) {
  const { socket } = useStreamProvider()
  const [store, setStore] = useState({
    audience: [],
    members: [],
    raisedHands: [],
    onStage: []
  })
  const { audience, members, raisedHands, onStage } = store;

  useEffect(() => {
    _initListeners()

    return () => socket?.off('members-updated')
  }, [])

  const _initListeners = () => {
    console.log('Initializing socket listeners...')
    // Apply listeners
    socket?.on('members-updated', ({ members, audience, raisedHands, onStage }) => setStore({ ...store, members, audience, raisedHands, onStage }))
  }

  return (
    <StreamMembersContext.Provider
      value={{
        audience,
        members,
        raisedHands,
        onStage
      }}
    >
      {children}
    </StreamMembersContext.Provider>
  )
}
