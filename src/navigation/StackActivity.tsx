import React from "react";
import { Activities } from ".";
import StreamWidget from "../scenes/Stream/StreamWidget";
import Stack from "./Stack";

export default function StackActivity() {
  return (
    <>
      <Stack {...Activities} />
      <StreamWidget />
    </>
  );
}
