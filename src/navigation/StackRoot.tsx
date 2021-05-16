import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "../hooks/useTheme";
import StackApp from "./StackApp";
import Splash from "../Splash";

import { createStackNavigator } from "@react-navigation/stack";
import StackAuth from "./StackAuth";
import { useAuthState } from "../hooks/useAuth";

const Stack = createStackNavigator();

export default function Root() {
  const { type, colors } = useTheme();
  const { isLoading, user } = useAuthState();

  if (isLoading) return <Splash />;
  return (
    <NavigationContainer theme={{ dark: type === "dark", colors }}>
      <StatusBar
        barStyle={type === "dark" ? "light-content" : "dark-content"}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!!user ? (
          <Stack.Screen name="App" component={StackApp} />
        ) : (
          <Stack.Screen name="Auth" component={StackAuth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
