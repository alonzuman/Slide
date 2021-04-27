import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AuthProvider from '../providers/AuthProvider'
import AuthConfirmCode from '../scenes/Auth/AuthConfirmCode'
import AuthPhoneNumber from '../scenes/Auth/AuthPhoneNumber'

const Stack = createStackNavigator()

export default function StackAuth() {
  return (
    <AuthProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Auth Phone' component={AuthPhoneNumber} />
        <Stack.Screen name='Auth Confirm Code' component={AuthConfirmCode} />
        <Stack.Screen name='Auth Unique Code' component={AuthConfirmCode} />
      </Stack.Navigator>
    </AuthProvider>
  )
}
