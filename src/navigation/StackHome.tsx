import React from "react";
import { Home } from ".";
import StreamWidget from "../scenes/Stream/StreamWidget";
import Stack from "./Stack";

export default function StackHome() {
  return (
    <>
      <Stack {...Home} />
      <StreamWidget />
    </>
  );
}
