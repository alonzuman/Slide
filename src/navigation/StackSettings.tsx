import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import Settings from '../scenes/Settings/Settings'

const Stack = createStackNavigator()

export default function StackSettings() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  )
}
