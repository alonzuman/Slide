import React from "react";
import { Me } from ".";
import StreamWidget from "../scenes/Stream/StreamWidget";
import Stack from "./Stack";

export default function StackMe() {
  return (
    <>
      <Stack {...Me} />
      <StreamWidget />
    </>
  );
}
