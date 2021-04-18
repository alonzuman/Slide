import React from 'react'
import { View, Text } from 'react-native'
import StreamSpeakers from './StreamSpeakers'
import StreamWidgets from './StreamWidgets'

export default function StreamOverlay() {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: 'blue' }}>
      <StreamWidgets />
      <StreamSpeakers />
    </View>
  )
}
