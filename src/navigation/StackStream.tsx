import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Stream from "../scenes/Stream/Stream";
import StreamInvites from "../scenes/Stream/StreamInvites";
import StreamMembers from "../scenes/Stream/StreamMembers";

const Stack = createStackNavigator();

export default function StackStream() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Stream"
        component={Stream}
        options={{ headerTransparent: true }}
      />
      <Stack.Screen name="Stream Invite" component={StreamInvites} />
      <Stack.Screen name="Stream Members" component={StreamMembers} />
    </Stack.Navigator>
  );
}
