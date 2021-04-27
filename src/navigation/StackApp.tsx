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
import SnackbarProvider from '../providers/SnackbarProvider'
import InvitesProvider from '../providers/InvitesProvider'
import StackInvites from './StackInvites'
import EngineProvider from '../providers/EngineProvider'
import SocketProvider from '../providers/SocketProvider'

const Stack = createStackNavigator()

export default function StackApp() {
  const { user, isLoading } = useUser()

  // Check the state of the current user in order to know what stack should be rendered.
  const isInvited = (!!user?.invite)
  const isMissingOnBoarding = (!user?.onBoarding?.name || !user?.onBoarding?.avatar || !user?.onBoarding?.interests)

  const _render = () => {
    if (isMissingOnBoarding) return (
      <>
        <Stack.Screen name='Name' component={OnBoardingName} />
        <Stack.Screen name='Profile Picture' component={OnBoardingAvatar} />
        <Stack.Screen name='Pick Your Interests' component={OnBoardingInterests} />
      </>
    )

    return (
      <>
        <Stack.Screen name='Home' component={TabsNavigator} />
        <Stack.Screen name='Stream' component={StackStream} />
        <Stack.Screen name='Invite Friends' component={StackInvites} />
      </>
    )
  }

  if (isLoading) return <Splash />
  if (!isInvited) return <IsNotInvited />

  return (
    <EngineProvider>
      <SocketProvider>
        <SnackbarProvider>
          <ModalProvider>
            <StreamLayoutProvider>
              <StreamProvider>
                <ExploreProvider>
                  <InvitesProvider>
                    <Notification />
                    <Stack.Navigator mode={isMissingOnBoarding ? 'card' : 'modal'} screenOptions={{ headerShown: false }}>
                      {_render()}
                    </Stack.Navigator>
                  </InvitesProvider>
                </ExploreProvider>
              </StreamProvider>
            </StreamLayoutProvider>
          </ModalProvider>
        </SnackbarProvider>
      </SocketProvider>
    </EngineProvider>
  )
}
