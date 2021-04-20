import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import StreamLayoutProvider from '../providers/StreamLayoutProvider'
import StreamMembersProvider from '../providers/StreamMembersProvider'
import StreamMetaProvider from '../providers/StreamMetaProvider'
import StreamSpeakersProvider from '../providers/StreamSpeakersProvider'
import StackStream from './StackStream'
import TabsNavigator from './TabsNavigator'

const Stack = createStackNavigator()

export default function StackApp() {
  return (
    <StreamMetaProvider>
      <StreamLayoutProvider>
        <StreamMembersProvider>
          <StreamSpeakersProvider>
            <Stack.Navigator mode='modal'>
              <Stack.Screen name='Home' component={TabsNavigator} options={{ headerShown: false }} />
              <Stack.Screen name='Stream' component={StackStream} options={{ headerShown: false }} />
            </Stack.Navigator>
          </StreamSpeakersProvider>
        </StreamMembersProvider>
      </StreamLayoutProvider>
    </StreamMetaProvider>
  )
}
