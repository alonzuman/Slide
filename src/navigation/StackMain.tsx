import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HeaderLeft from '../core/HeaderLeft'
import Feedback from '../scenes/Feedback/Feedback'
import StackInvites from './StackInvites'
import StackStream from './StackStream'
import TabsNavigator from './TabsNavigator'

const Stack = createStackNavigator()

export default function StackMain() {
  return (
    <Stack.Navigator mode='modal' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={TabsNavigator} />
      <Stack.Screen name='Stream' component={StackStream} />
      <Stack.Screen name='Invite Friends' component={StackInvites} />
      <Stack.Screen name='Feedback' component={Feedback} />
    </Stack.Navigator>
  )
}
