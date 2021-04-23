
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import Logo from './core/Logo'
import { useTheme } from './hooks/useTheme'

export default function Splash() {
  const theme = useTheme()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme?.colors?.background || '#000' }}>
      <Logo style={{ alignSelf: 'center', height: 48, width: 112, marginBottom: 16 }} />
      <ActivityIndicator />
    </View>
  )
}
