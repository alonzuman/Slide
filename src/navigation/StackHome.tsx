import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Typography from '../core/Typography'
import { useTheme } from '../hooks/useTheme'
import Home from '../scenes/Home/Home'
import StreamWidget from '../scenes/Stream/StreamWidget'

const Stack = createStackNavigator()

export default function StackHome() {
  const { colors } = useTheme()

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.cardMain,
            borderBottomColor: colors.border,
          }
        }}
      >
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
      <StreamWidget />
    </>
  )
}
