import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AuthConfirmCode from '../scenes/Auth/AuthConfirmCode'
import AuthPhoneNumber from '../scenes/Auth/AuthPhoneNumber'
import AuthStackProvider from '../providers/AuthStackProvider'

const Stack = createStackNavigator()

export default function StackAuth() {
  return (
    <AuthStackProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Auth Phone' component={AuthPhoneNumber} />
        <Stack.Screen name='Auth Confirm Code' component={AuthConfirmCode} />
        <Stack.Screen name='Auth Unique Code' component={AuthConfirmCode} />
      </Stack.Navigator>
    </AuthStackProvider>
  )
}
