import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import globals from "../../globals";
import { useTheme } from "../../hooks/useTheme";

export default function StreamControlsExit() {
  const { goBack } = useNavigation();
  const { colors } = useTheme();

  const handlePress = () => {
    goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Entypo
        name='chevron-down'
        size={24}
        color={colors.text}
        style={globals.textShadow}
      />
    </TouchableOpacity>
  );
}
