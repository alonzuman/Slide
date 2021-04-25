import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import HeaderLeft from '../core/HeaderLeft'
import Explore from '../scenes/Explore/Explore'
import ProfileFollowers from '../scenes/Profile/ProfileFollowers'
import ProfileFollowing from '../scenes/Profile/ProfileFollowing'
import UserProfile from '../scenes/Profile/UserProfile'
import StreamWidget from '../scenes/Stream/StreamWidget'

const Stack = createStackNavigator()

export default function StackExplore() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => <HeaderLeft />,
        }}
      >
        <Stack.Screen name='Explore' component={Explore} />
        <Stack.Screen name='User Profile' component={UserProfile} />
        <Stack.Screen name='Followers' component={ProfileFollowers} />
        <Stack.Screen name='Following' component={ProfileFollowing} />
      </Stack.Navigator>
      <StreamWidget />
    </>
  )
}
