import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import PhoneSignIn from '../scenes/Auth/PhoneSignIn'

const Stack = createStackNavigator()

export default function StackAuth() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Phone Sign In' component={PhoneSignIn} />
    </Stack.Navigator>
  )
}
