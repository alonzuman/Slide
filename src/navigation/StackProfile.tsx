import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import ProfileFollowers from '../scenes/Profile/ProfileFollowers'
import ProfileFollowing from '../scenes/Profile/ProfileFollowing'
import UserProfile from '../scenes/Profile/UserProfile'

const Stack = createStackNavigator()

export default function StackProfile() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Profile' component={UserProfile} />
      <Stack.Screen name='Followers' component={ProfileFollowers} />
      <Stack.Screen name='Following' component={ProfileFollowing} />
    </Stack.Navigator>
  )
}
