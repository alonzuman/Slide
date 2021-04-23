import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BlurView } from '@react-native-community/blur'

export default function BlurWrapper({ children, style }) {
  return (
    <View style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <BlurView
        style={{ ...StyleSheet.absoluteFillObject }}
        blurType={'regular'}
        blurAmount={32}
        reducedTransparencyFallbackColor="transparent"
      />
      {children}
    </View>
  )
}
