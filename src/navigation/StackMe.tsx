import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HeaderLeft from '../core/HeaderLeft'
import Me from '../scenes/Me/Me'
import ProfileFollowers from '../scenes/Profile/ProfileFollowers'
import ProfileFollowing from '../scenes/Profile/ProfileFollowing'
import UserProfile from '../scenes/Profile/UserProfile'
import Settings from '../scenes/Settings/Settings'

const Stack = createStackNavigator()

export default function StackMe() {
  return (
    <Stack.Navigator screenOptions={{ headerLeft: () => <HeaderLeft /> }}>
      <Stack.Screen name='Me' component={Me} options={{ headerLeft: () => null }} />
      <Stack.Screen name='Followers' component={ProfileFollowers} />
      <Stack.Screen name='Following' component={ProfileFollowing} />
      <Stack.Screen name='User Profile' component={UserProfile} />
      <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  )
}
