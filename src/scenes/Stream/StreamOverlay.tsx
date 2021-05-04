import React from 'react'
import { View, Pressable } from 'react-native'
import useStreamLayout from '../../hooks/useStreamLayout'
import StreamActiveSpeaker from './StreamActiveSpeaker'
import StreamSpeakers from './StreamSpeakers'
import StreamWidgets from './StreamWidgets'

export default function StreamOverlay() {
  const { toggleZenMode } = useStreamLayout()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
        overflow: 'hidden'
      }}
    >
      <StreamActiveSpeaker />
      <StreamWidgets />
      <Pressable onPress={toggleZenMode} style={{ flex: 1 }} />
      <StreamSpeakers />
    </View>
  )
}
