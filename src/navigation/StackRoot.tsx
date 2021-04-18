import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUser } from '../hooks/useUser'
import Splash from '../Splash'
import StackAuth from './StackAuth'
import StackStream from './StackStream'
import TabsNavigator from './TabsNavigator'
import auth from '@react-native-firebase/auth'
import { clearUser, fetchMyUser } from '../slices/user'
import useAppInitializer from '../hooks/useAppInitializer'
import StackApp from './StackApp'
import EngineProvider from '../scenes/Stream/StreamProvider'
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
    <EngineProvider>
      <NavigationContainer theme={{ dark: type === 'dark', colors }}>
        <StatusBar barStyle={type === 'dark' ? 'light-content' : 'dark-content'} />
        {_render()}
      </NavigationContainer>
    </EngineProvider>
  )
}
