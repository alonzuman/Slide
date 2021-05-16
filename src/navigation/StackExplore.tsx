import React from "react";
import { Explore } from ".";
import StreamWidget from "../scenes/Stream/StreamWidget";
import Stack from "./Stack";

export default function StackExplore() {
  return (
    <>
      <Stack {...Explore} />
      <StreamWidget />
    </>
  );
}
