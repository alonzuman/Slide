import React from "react";
import EventCreateProvider from "../providers/EventCreateProvider";
import Stack from "./Stack";
import { Events } from "./index";

export default function StackEvent() {
  return (
    <EventCreateProvider>
      <Stack {...Events} />
    </EventCreateProvider>
  );
}
