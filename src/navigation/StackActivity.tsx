import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import Activity from '../scenes/Activity/Activity'

const Stack = createStackNavigator()

export default function StackActivity() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Activity' component={Activity} />
    </Stack.Navigator>
  )
}
