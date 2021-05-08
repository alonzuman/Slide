import { useNavigation } from "@react-navigation/native";
import React from "react";
import PrimaryButton from "../../core/PrimaryButton";

export default function EventCreateButton() {
  const { navigate } = useNavigation();

  return (
    <PrimaryButton
      title="Create"
      size="s"
      onPress={() =>
        navigate("Event", {
          screen: "Event Create",
        })
      }
    />
  );
}
