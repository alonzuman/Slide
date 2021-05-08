import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EventCreateProvider from "../providers/EventCreateProvider";
import EventCreate from "../scenes/Event/EventCreate";
import EventCreateGuests from "../scenes/Event/EventCreateGuests";

const Stack = createStackNavigator();

export default function StackEvent() {
  return (
    <EventCreateProvider>
      <Stack.Navigator>
        <Stack.Screen name="Event Create" component={EventCreate} />
        <Stack.Screen
          name="Event Create Guests"
          component={EventCreateGuests}
        />
      </Stack.Navigator>
    </EventCreateProvider>
  );
}
