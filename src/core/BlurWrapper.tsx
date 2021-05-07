import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { BlurView } from '@react-native-community/blur'

export default function BlurWrapper({ children, style }: { children: any, style: ViewStyle }) {
  return (
    <View style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <BlurView
        style={{ ...StyleSheet.absoluteFillObject }}
        blurType='light'
        blurAmount={32}
        reducedTransparencyFallbackColor="transparent"
      />
      {children}
    </View>
  )
}
