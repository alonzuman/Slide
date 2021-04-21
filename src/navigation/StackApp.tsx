import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Notification from '../scenes/Activity/Notification'
import NotificationsProvider from '../providers/NotificationsProvider'
import StreamLayoutProvider from '../providers/StreamLayoutProvider'
import StreamMembersProvider from '../providers/StreamMembersProvider'
import StreamMetaProvider from '../providers/StreamMetaProvider'
import StreamSpeakersProvider from '../providers/StreamSpeakersProvider'
import StackStream from './StackStream'
import TabsNavigator from './TabsNavigator'
import ExploreProvider from '../providers/ExploreProvider'

const Stack = createStackNavigator()

export default function StackApp() {
  return (
    <StreamMetaProvider>
      <StreamLayoutProvider>
        <StreamMembersProvider>
          <StreamSpeakersProvider>
            <ExploreProvider>
              <Notification />
              <Stack.Navigator mode='modal'>
                <Stack.Screen name='Home' component={TabsNavigator} options={{ headerShown: false }} />
                <Stack.Screen name='Stream' component={StackStream} options={{ headerShown: false }} />
              </Stack.Navigator>
            </ExploreProvider>
          </StreamSpeakersProvider>
        </StreamMembersProvider>
      </StreamLayoutProvider>
    </StreamMetaProvider>
  )
}
