import React from 'react'
import { View, Pressable } from 'react-native'
import StreamSpeakers from './StreamSpeakers'
import StreamWidgets from './StreamWidgets'

export default function StreamOverlay() {
  const handlePress = () => {
    console.log('pressed')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <StreamWidgets />
      <Pressable onPress={handlePress} style={{ flex: 1 }} />
      <StreamSpeakers />
    </View>
  )
}
