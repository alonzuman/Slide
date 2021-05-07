import React from "react";
import Chip from "../../core/Chip";
import useStream from "../../hooks/useStream";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../hooks/useTheme";

export default function StreamControlsSwitchCamera() {
  const { colors } = useTheme();
  const { switchCamera } = useStream();

  return (
    <Chip
      size="m"
      onPress={switchCamera}
      renderLabel={
        <MaterialCommunityIcons
          size={20}
          color={colors.text}
          name={"camera-retake"}
        />
      }
    />
  );
}
