import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from '../scenes/Home/Home'
import StreamWidget from '../scenes/Stream/StreamWidget'

const Stack = createStackNavigator()

export default function StackHome() {
  return (
    <>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
    </Stack.Navigator>
    <StreamWidget />
    </>
  )
}
