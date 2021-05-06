import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Notification from "../scenes/Activity/Notification";
import StreamLayoutProvider from "../providers/StreamLayoutProvider";
import StreamProvider from "../providers/StreamProvider";
import ExploreProvider from "../providers/ExploreProvider";
import ModalProvider from "../providers/ModalProvider";
import { useUser } from "../hooks/useUser";
import Splash from "../Splash";
import SnackbarProvider from "../providers/SnackbarProvider";
import InvitesProvider from "../providers/InvitesProvider";
import EngineProvider from "../providers/EngineProvider";
import SocketProvider from "../providers/SocketProvider";
import StackOnBoarding from "./StackOnBoarding";
import StackMain from "./StackMain";
import StackNomination from "./StackNomination";

const Stack = createStackNavigator();

export default function StackApp() {
  const { user, isLoading } = useUser();

  // Check the state of the current user in order to know what stack should be rendered.
  const isInvited = !!user?.invite;
  const isMissingOnBoarding =
    !user?.onBoarding?.name ||
    !user?.onBoarding?.avatar ||
    !user?.onBoarding?.interests;

  if (isLoading) return <Splash />;

  return (
    <EngineProvider>
      <SocketProvider>
        <SnackbarProvider>
          <ModalProvider>
            <ExploreProvider>
              <InvitesProvider>
                <Notification />
                <Stack.Navigator
                  mode="card"
                  screenOptions={{ headerShown: false }}
                >
                  {!isInvited ? (
                    <Stack.Screen
                      name="Nomination"
                      component={StackNomination}
                    />
                  ) : isMissingOnBoarding ? (
                    <Stack.Screen
                      name="On Boarding"
                      component={StackOnBoarding}
                    />
                  ) : (
                    <Stack.Screen name="Main" component={StackMain} />
                  )}
                </Stack.Navigator>
              </InvitesProvider>
            </ExploreProvider>
          </ModalProvider>
        </SnackbarProvider>
      </SocketProvider>
    </EngineProvider>
  );
}
