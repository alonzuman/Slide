import React from 'react'
import { useUser } from '../hooks/useUser'
import Splash from '../Splash'
import StackAuth from './StackAuth'
import useAppInitializer from '../hooks/useAppInitializer'
import StackApp from './StackApp'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '../hooks/useTheme'
import { StatusBar } from 'react-native'

export default function StackRoot() {
  useAppInitializer()
  const { colors, type } = useTheme()
  const { user, isLoading } = useUser()

  const _render = () => {
    if (isLoading) return <Splash />
    if (!user) return <StackAuth />
    return <StackApp />
  }

  return (
    <NavigationContainer theme={{ dark: type === 'dark', colors }}>
      <StatusBar barStyle={type === 'dark' ? 'light-content' : 'dark-content'} />
      {_render()}
    </NavigationContainer>
  )
}
