import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import StackApp from './StackApp'
import Splash from '../Splash'
import auth from '@react-native-firebase/auth'
import { createStackNavigator } from '@react-navigation/stack'
import StackAuth from './StackAuth'

const Stack = createStackNavigator()

export default function Root() {
  const { type, colors } = useTheme()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(res => {
      if (res) {
        setUser(res)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscriber()
  }, [])

  if (isLoading) return <Splash />
  return (
    <NavigationContainer theme={{ dark: type === 'dark', colors }}>
      <StatusBar barStyle={type === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!!user ?
          <Stack.Screen name='App' component={StackApp} /> :
          <Stack.Screen name='Auth' component={StackAuth} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
