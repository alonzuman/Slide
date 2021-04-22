
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useTheme } from './hooks/useTheme'

export default function Splash() {
  const theme = useTheme()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme?.colors?.background || '#000' }}>
      <ActivityIndicator />
    </View>
  )
}
