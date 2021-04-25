import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HeaderLeft from '../core/HeaderLeft'
import Settings from '../scenes/Settings/Settings'
import SettingsAppearance from '../scenes/Settings/SettingsAppearance'

const Stack = createStackNavigator()

export default function StackSettings() {
  return (
    <Stack.Navigator screenOptions={{ headerLeft: () => <HeaderLeft /> }}>
      <Stack.Screen name='Settings' component={Settings} />
      <Stack.Screen name='Settings Appearance' component={SettingsAppearance} />
    </Stack.Navigator>
  )
}
