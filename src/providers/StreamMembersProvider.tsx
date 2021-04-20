import React, { createContext, useEffect, useState } from 'react'
import { useStreamProvider } from '../hooks/useStreamProvider'

export const StreamMembersContext = createContext()

export default function StreamMembersProvider({ children }) {
  const { socket } = useStreamProvider()
  const [store, setStore] = useState({
    audience: [],
    members: [],
    owners: [],
    raisedHands: [],
    onStage: []
  })
  const { audience, owners, members, raisedHands, onStage } = store;

  useEffect(() => {
    _initListeners()

    return () => socket?.off('members-updated')
  }, [])

  const _initListeners = () => {
    console.log('Initializing socket listeners...')
    // Apply listeners
    socket?.on('members-updated', ({ members, audience, raisedHands, onStage, owners }) => setStore({ ...store, members, audience, raisedHands, onStage, owners }))
  }

  return (
    <StreamMembersContext.Provider
      value={{
        audience,
        members,
        raisedHands,
        onStage,
        owners
      }}
    >
      {children}
    </StreamMembersContext.Provider>
  )
}
