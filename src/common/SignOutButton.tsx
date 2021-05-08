import React from "react";
import auth from "@react-native-firebase/auth";
import { useQueryClient } from "react-query";
import DefaultButton from "../core/DefaultButton";
import useModal from "../hooks/useModal";
import Avatar from "../core/Avatar";
import { useUser } from "../hooks/useUser";
import Constants from "../constants/Constants";
import useSocket from "../hooks/useSocket";
import useEngine from "../hooks/useEngine";
import { useAppDispatch } from "../store";
import { leftStream } from "../slices/stream";

export default function SignOutButton({ style }) {
  const { openModal } = useModal();
  const { user } = useUser();
  const socket = useSocket();
  const engine = useEngine();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch()

  const handleSignOutPress = () => {
    openModal({
      renderBefore: (
        <Avatar size="l" uri={user?.avatar} style={{ marginTop: 12 }} />
      ),
      body: "Are you sure you wish to sign out?",
      type: Constants.Modals.SELECT,
      action: signOut,
      severity: "error",
    });
  };

  const signOut = () => {
    queryClient.clear();
    engine?.destroy();
    socket?.disconnect();
    dispatch(leftStream())
    auth().signOut();
  };

  return (
    <DefaultButton
      style={style}
      title="Sign out"
      onPress={handleSignOutPress}
    />
  );
}
