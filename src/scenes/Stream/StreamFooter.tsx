import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import StreamAudience from './StreamAudience'
import StreamControls from './StreamControls'

export default function StreamFooter() {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ paddingBottom: insets.bottom || 12, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <StreamAudience />
      <StreamControls />
    </View>
  )
}
