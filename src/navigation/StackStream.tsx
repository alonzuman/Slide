import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import Stream from '../scenes/Stream/Stream'

const Stack = createStackNavigator()

export default function StackStream() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Stream' component={Stream} options={{ headerTransparent: true }} />
    </Stack.Navigator>
  )
}
