import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EventCreateProvider from "../providers/EventCreateProvider";
import Event from "../scenes/Event/Event";
import EventCreate from "../scenes/EventCreate/EventCreate";
import EventCreateGuests from "../scenes/Event/EventCreateGuests";

const Stack = createStackNavigator();

export default function StackEvent() {
  return (
    <EventCreateProvider>
      <Stack.Navigator>
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="Event Create" component={EventCreate} />
        <Stack.Screen
          name="Event Create Guests"
          component={EventCreateGuests}
        />
      </Stack.Navigator>
    </EventCreateProvider>
  );
}
