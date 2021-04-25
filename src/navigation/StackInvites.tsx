import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HeaderLeft from '../core/HeaderLeft'
import { useTheme } from '../hooks/useTheme'
import InviteFriends from '../scenes/InviteFriends/InviteFriends'
import InvitesSent from '../scenes/InvitesSent/InvitesSent'

const Stack = createStackNavigator()

export default function StackInvites() {
  const { colors } = useTheme()

  return (
    <Stack.Navigator>
      <Stack.Screen name='Invite Friends' component={InviteFriends} />
      <Stack.Screen
        name='Invites Sent'
        component={InvitesSent}
        options={{
          headerLeft: () => <HeaderLeft />,
          headerStyle: {
            backgroundColor: colors.cardAlt,
            borderBottomColor: colors.border,
          }
        }}
      />
    </Stack.Navigator>
  )
}
