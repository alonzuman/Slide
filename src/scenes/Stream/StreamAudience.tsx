import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import AvatarsGroup from '../../core/AvatarsGroup'
import { useStream } from '../../hooks/useStream'
import { streamUpdated } from '../../slices/stream'

export default function StreamAudience() {
  const { audience } = useStream()
  const dispatch = useDispatch()

  return (
    <AvatarsGroup
      onPress={() => dispatch(streamUpdated({ openModal: 'AUDIENCE' }))}
      users={audience}
      max={2}
    />
  )
}
