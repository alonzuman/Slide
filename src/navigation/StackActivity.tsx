import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Activity from '../scenes/Activity/Activity'
import ProfileFollowers from '../scenes/Profile/ProfileFollowers'
import ProfileFollowing from '../scenes/Profile/ProfileFollowing'
import UserProfile from '../scenes/Profile/UserProfile'

const Stack = createStackNavigator()

export default function StackActivity() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Activity' component={Activity} options={{ headerShown: false }} />
      <Stack.Screen name='User Profile' component={UserProfile} />
      <Stack.Screen name='Followers' component={ProfileFollowers} />
      <Stack.Screen name='Followings' component={ProfileFollowing} />
    </Stack.Navigator>
  )
}
