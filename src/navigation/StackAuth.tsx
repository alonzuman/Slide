import React from "react";
import AuthStackProvider from "../providers/AuthStackProvider";
import { Auth } from ".";
import Stack from "./Stack";

export default function StackAuth() {
  return (
    <AuthStackProvider>
      <Stack {...Auth} />
    </AuthStackProvider>
  );
}
