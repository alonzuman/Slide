import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import PrimaryButton from "../../core/PrimaryButton";

export default function EventCreateButton({ style }: TouchableOpacityProps) {
  const { navigate } = useNavigation();

  return (
    <PrimaryButton
      title="Create"
      size="s"
      style={style}
      onPress={() =>
        navigate("Event", {
          screen: "Event Create",
        })
      }
    />
  );
}
