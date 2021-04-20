import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StackHome from './StackHome'
import StackExplore from './StackExplore'
import StackMe from './StackMe'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { View } from 'react-native'
import Avatar from '../core/Avatar'
import { useUser } from '../hooks/useUser'
import { useTheme } from '../hooks/useTheme'
import StackActivity from './StackActivity'

const Tabs = createBottomTabNavigator()

export default function TabsNavigator() {
  const { user } = useUser()
  const { colors } = useTheme()

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name='Home'
        component={StackHome}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => <Ionicons name='grid-outline' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name='Explore'
        component={StackExplore}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => <AntDesign name='search1' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name='Activity'
        component={StackActivity}
        options={{
          title: () => null,
          tabBarIcon: ({ color, size }) => <Ionicons name='ios-heart-outline' color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name='Me'
        component={StackMe}
        options={{
          title: () => null,
          tabBarIcon: ({ focused, ...rest }) => (
            <View
              style={{
                borderWidth: 2,
                borderColor: focused ? colors.secondaryDark : 'transparent',
                padding: 2,
                borderRadius: 18
              }}
            >
              <Avatar {...rest} size='s' uri={user?.avatar} />
            </View>
          )
        }}
      />
    </Tabs.Navigator>
  )
}
