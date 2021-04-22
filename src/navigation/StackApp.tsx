import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Notification from '../scenes/Activity/Notification'
import StreamLayoutProvider from '../providers/StreamLayoutProvider'
import StreamProvider from '../providers/StreamProvider'
import StreamSpeakersProvider from '../providers/StreamSpeakersProvider'
import StackStream from './StackStream'
import TabsNavigator from './TabsNavigator'
import ExploreProvider from '../providers/ExploreProvider'
import ModalProvider from '../providers/ModalProvider'

const Stack = createStackNavigator()

export default function StackApp() {
  return (
    <ModalProvider>
      <StreamLayoutProvider>
        <StreamProvider>
          <StreamSpeakersProvider>
            <ExploreProvider>
              <Notification />
              <Stack.Navigator mode='modal'>
                <Stack.Screen name='Home' component={TabsNavigator} options={{ headerShown: false }} />
                <Stack.Screen name='Stream' component={StackStream} options={{ headerShown: false }} />
              </Stack.Navigator>
            </ExploreProvider>
          </StreamSpeakersProvider>
        </StreamProvider>
      </StreamLayoutProvider>
    </ModalProvider>
  )
}
