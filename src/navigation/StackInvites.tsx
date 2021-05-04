import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import InviteFriends from '../scenes/InviteFriends/InviteFriends'
import InvitesSent from '../scenes/InvitesSent/InvitesSent'

const Stack = createStackNavigator()

export default function StackInvites() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Invite Friends' component={InviteFriends} />
      <Stack.Screen name='Invites Sent' component={InvitesSent} />
    </Stack.Navigator>
  )
}
