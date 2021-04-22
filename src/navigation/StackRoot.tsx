import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import useAppInitializer from '../hooks/useAppInitializer'
import { useTheme } from '../hooks/useTheme'
import { useUser } from '../hooks/useUser'
import Splash from '../Splash'
import StackApp from './StackApp'
import StackAuth from './StackAuth'
import StackOnBoarding from './StackOnBoarding'
import auth from '@react-native-firebase/auth'

export default function Root() {
  const { isInitializing } = useAppInitializer()
  const { isLoading, user } = useUser()
  const { type, colors } = useTheme()

  const isNotAuthOrInvited = (!auth().currentUser || !user || !user.invite)
  const isMissingOnBoarding = (!user?.onBoarding?.name || !user?.onBoarding?.avatar || !user?.onBoarding?.interests)

  const _render = () => {
    if (isInitializing || isLoading) return <Splash />
    if (isNotAuthOrInvited) return <StackAuth />
    if (isMissingOnBoarding) return <StackOnBoarding />
    return <StackApp />
  }

  return (
    <NavigationContainer theme={{ dark: type === 'dark', colors }}>
      <StatusBar barStyle={type === 'dark' ? 'light-content' : 'dark-content'} />
      {_render()}
    </NavigationContainer>
  )
}
