import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import StackApp from './StackApp'
import AuthProvider from '../providers/AuthProvider'

export default function Root() {
  const { type, colors } = useTheme()

  return (
    <NavigationContainer theme={{ dark: type === 'dark', colors }}>
      <StatusBar barStyle={type === 'dark' ? 'light-content' : 'dark-content'} />
      <AuthProvider>
        <StackApp />
      </AuthProvider>
    </NavigationContainer>
  )
}
