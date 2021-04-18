import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../hooks/useTheme'

export default function ModalNotch() {
  const { colors } = useTheme()

  return (
    <View
      style={{
        padding: 8,
        top: 0,
        right: 0,
        left: 0
      }}>
      <View
        style={{
          borderRadius: 12,
          height: 6,
          width: 36,
          backgroundColor: colors.border,
          alignSelf: 'center'
        }}
      />
    </View>
  )
}
