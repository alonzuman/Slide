import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { useTheme } from '../hooks/useTheme'

export default function BlurWrapper({ children, style }: { children: any, style: ViewStyle }) {
  const { colors } = useTheme()

  return (
    <View style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: `${colors.cardAlt}40` }} />
      <BlurView
        style={{ ...StyleSheet.absoluteFillObject }}
        blurType={'dark'}
        blurAmount={32}
        reducedTransparencyFallbackColor="transparent"
      />
      {children}
    </View>
  )
}
