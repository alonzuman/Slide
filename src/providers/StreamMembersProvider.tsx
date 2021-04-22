import React, { createContext, useEffect, useReducer, useState } from 'react'
import { io } from 'socket.io-client'
import { SOCKET_URL } from '../API/API'
import { useUser } from '../hooks/useUser'
import auth from '@react-native-firebase/auth'
import stream, { initialState, JOINED_STREAM, SET_SOCKET, STREAM_UPDATED } from '../reducers/stream'

export const StreamMembersContext = createContext()

export default function StreamMembersProvider({ children }) {
  const { user } = useUser()
  const [{
    socket,
    streamID,
    audience,
    meta,
    members,
    raisedHands,
    onStage,
    owners,
    isLive,
    isJoined
  }, dispatch] = useReducer(stream, initialState)

  const _initSocket = async () => {
    if (socket) return null;
    console.log('Initializing socket...')
    const currentUser = auth().currentUser
    const token = await currentUser?.getIdToken()

    const _socket = io(SOCKET_URL, {
      query: {
        token
      }
    })

    dispatch({ type: SET_SOCKET, payload: _socket })
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

  const initSocketListeners = () => {
    console.log('Initializing socket listeners...')
    // Apply listeners

    socket?.on('joined-stream', (data) => {
      dispatch({
        type: JOINED_STREAM,
        payload: data
      })
    })

    socket?.on('members-updated', (data) => {
      dispatch({
        type: STREAM_UPDATED,
        payload: data
      })
    })

    socket?.on('stream-ended', () => {
      alert('Stream ended')
      dispatch({
        type: STREAM_UPDATED,
        payload: { isLive: false }
      })
    })
  }

  const clearListeners = () => {
    socket?.off('members-updated')
    socket?.off('stream-ended')
  }

  const joinStream = ({ streamID }) => socket?.emit('join-stream', ({ streamID }))
  const raiseHand = () => socket?.emit('raise-hand', ({ streamID }))
  const unraiseHand = () => socket?.emit('unraise-hand', ({ streamID }))
  const endStream = () => socket?.emit('end-stream', ({ streamID }))

  return (
    <StreamMembersContext.Provider
      value={{
        socket,
        streamID,
        audience,
        members,
        raisedHands,
        onStage,
        owners,
        isLive,
        meta,
        isJoined,
        joinStream,
        raiseHand,
        unraiseHand,
        endStream,
        initSocketListeners,
        clearListeners
      }}
    >
      {children}
    </StreamMembersContext.Provider>
  )
}
