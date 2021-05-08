import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "../../hooks/useTheme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import globals from "../../globals";

export default function StreamControlsInvite() {
  const { push } = useNavigation();
  const { colors } = useTheme();
  const handlePress = () => push("Stream Invite");

  return (
    <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={handlePress}>
      <Feather
        style={globals.textShadow}
        color={colors.text}
        name={"send"}
        size={24}
      />
    </TouchableOpacity>
  );
}
