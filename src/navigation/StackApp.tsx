import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Notification from '../scenes/Activity/Notification'
import StreamLayoutProvider from '../providers/StreamLayoutProvider'
import StreamProvider from '../providers/StreamProvider'
import StackStream from './StackStream'
import TabsNavigator from './TabsNavigator'
import ExploreProvider from '../providers/ExploreProvider'
import ModalProvider from '../providers/ModalProvider'
import { useUser } from '../hooks/useUser'
import Splash from '../Splash'
import OnBoardingName from '../scenes/OnBoarding/OnBoardingName'
import OnBoardingAvatar from '../scenes/OnBoarding/OnBoardingAvatar'
import OnBoardingInterests from '../scenes/OnBoarding/OnBoardingInterests'
import IsNotInvited from '../scenes/IsNotInvited/IsNotInvited'

const Stack = createStackNavigator()

export default function StackApp() {
  const { user, isLoading } = useUser()

  // Check the state of the current user in order to know what stack should be rendered.
  const isInvited = (!!user?.invite)
  const isMissingOnBoarding = (!user?.onBoarding?.name || !user?.onBoarding?.avatar || !user?.onBoarding?.interests)

  if (isLoading) return <Splash />
  if (!isInvited) return <IsNotInvited />

  return (
    <ModalProvider>
      <StreamLayoutProvider>
        <StreamProvider>
          <ExploreProvider>
            <Notification />
            <Stack.Navigator mode={isMissingOnBoarding ? '' : 'modal'} screenOptions={{ headerShown: false }}>
              {isMissingOnBoarding ? (
                <>
                  <Stack.Screen name='Name' component={OnBoardingName} />
                  <Stack.Screen name='Profile Picture' component={OnBoardingAvatar} />
                  <Stack.Screen name='Pick Your Interests' component={OnBoardingInterests} />
                </>
              ) : (
                <>
                  <Stack.Screen name='Home' component={TabsNavigator} />
                  <Stack.Screen name='Stream' component={StackStream} />
                </>
              )}
            </Stack.Navigator>
          </ExploreProvider>
        </StreamProvider>
      </StreamLayoutProvider>
    </ModalProvider>
  )
}
