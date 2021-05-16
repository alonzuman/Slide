import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const StackNav = createStackNavigator();

type Props = {
  screens: any[];
  navigatorProps: any;
};

export default function Stack({ screens, navigatorProps }: Props) {
  return (
    <StackNav.Navigator {...navigatorProps}>
      {screens.map((screen) => (
        <StackNav.Screen {...screen} key={screen.name} />
      ))}
    </StackNav.Navigator>
  );
}
