import React from 'react'
import { View, Pressable } from 'react-native'
import useStreamLayout from '../../hooks/useStreamLayout'
import StreamSpeakers from './StreamSpeakers'
import StreamWidgets from './StreamWidgets'

export default function StreamOverlay() {
  const { toggleZenMode } = useStreamLayout()

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <StreamWidgets />
      <Pressable onPress={toggleZenMode} style={{ flex: 1 }} />
      <StreamSpeakers />
    </View>
  )
}
