import React, { useEffect, createContext, useState } from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth'
import Splash from '../Splash'
import PhoneSignIn from '../scenes/Auth/PhoneSignIn'
import { createStackNavigator } from '@react-navigation/stack'
import Typography from '../core/Typography'
import { SafeAreaView } from 'react-native-safe-area-context'
import DefaultButton from '../core/DefaultButton'
import { useNavigation } from '@react-navigation/native'
import StackApp from '../navigation/StackApp'
import { useQueryClient } from 'react-query'

const Stack = createStackNavigator()
export const AuthContext = createContext()

export default function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const queryClient = useQueryClient()

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

  const signOut = () => {
    queryClient.clear()
    auth().signOut()
  }

  if (isLoading) return <Splash />
  return (
    <AuthContext.Provider value={{ signOut }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!!user ?
          <Stack.Screen name='App' component={StackApp} /> :
          <Stack.Screen name='Auth' component={PhoneSignIn} />
        }
      </Stack.Navigator>
    </AuthContext.Provider>
  )
}
