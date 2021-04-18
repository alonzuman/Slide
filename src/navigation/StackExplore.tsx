import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import Explore from '../scenes/Explore/Explore'

const Stack = createStackNavigator()

export default function StackExplore() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Explore' component={Explore} />
    </Stack.Navigator>
  )
}
