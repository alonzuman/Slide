import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HeaderLeft from '../core/HeaderLeft'
import { useTheme } from '../hooks/useTheme'
import Settings from '../scenes/Settings/Settings'

const Stack = createStackNavigator()

export default function StackSettings() {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <HeaderLeft />,
        headerStyle: {
          backgroundColor: colors.cardAlt,
          borderBottomColor: colors.border,
        }
      }}
    >
      <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  )
}
