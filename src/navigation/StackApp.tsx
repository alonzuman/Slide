import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import StackStream from './StackStream'
import TabsNavigator from './TabsNavigator'

const Stack = createStackNavigator()

export default function StackApp() {
  return (
    <Stack.Navigator mode='modal'>
      <Stack.Screen name='Home' component={TabsNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='Stream' component={StackStream} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
