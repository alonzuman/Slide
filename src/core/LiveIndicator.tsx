import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '../hooks/useTheme'
import Typography from './Typography'

type Props = {
  size?: 's' | 'm' | 'l'
  style?: ViewStyle
}

export default function LiveIndicator({ style, size = 's' }: Props) {
  const { colors } = useTheme()

  return (
    <View style={{ position: 'relative', padding: size === 's' ? 4 : 12, borderRadius: 4, overflow: 'hidden', ...style }}>
      {colors?.primary && colors?.secondary && (
        <LinearGradient
          style={{ ...StyleSheet.absoluteFillObject }}
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: .5 }}
          end={{ x: 1, y: 0 }}
        />
      )}
      <Typography variant='h5' style={{ fontSize: size === 's' ? 12 : 14 }}>LIVE</Typography>
    </View>
  )
}
