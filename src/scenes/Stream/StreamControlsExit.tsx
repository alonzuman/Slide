import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../hooks/useTheme";

export default function StreamControlsExit() {
  const { goBack } = useNavigation();
  const { colors } = useTheme();

  const handlePress = () => {
    goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialCommunityIcons name='close' size={28} color={colors.text} />
    </TouchableOpacity>
  );
}
