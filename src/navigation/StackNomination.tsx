import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import NominationUniqueCode from '../scenes/Nomination/NominationUniqueCode'
import NominationNotInvited from '../scenes/Nomination/NominationNotInvited'

const Stack = createStackNavigator()

export default function StackNomination() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Nomination Unique Code' component={NominationUniqueCode} />
      <Stack.Screen name='Nomination Not Invited' component={NominationNotInvited} />
    </Stack.Navigator>
  )
}
