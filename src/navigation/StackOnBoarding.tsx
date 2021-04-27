import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import OnBoardingAvatar from '../scenes/OnBoarding/OnBoardingAvatar'
import OnBoardingInterests from '../scenes/OnBoarding/OnBoardingInterests'
import OnBoardingName from '../scenes/OnBoarding/OnBoardingName'

const Stack = createStackNavigator()

export default function StackOnBoarding() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Name' component={OnBoardingName} />
      <Stack.Screen name='Profile Picture' component={OnBoardingAvatar} />
      <Stack.Screen name='Pick Your Interests' component={OnBoardingInterests} />
    </Stack.Navigator>
  )
}
