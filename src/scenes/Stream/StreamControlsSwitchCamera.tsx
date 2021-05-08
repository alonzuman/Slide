import React from "react";
import useStream from "../../hooks/useStream";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useTheme } from "../../hooks/useTheme";
import { TouchableOpacity } from "react-native";
import globals from "../../globals";

export default function StreamControlsSwitchCamera() {
  const { colors } = useTheme();
  const { switchCamera } = useStream();

  return (
    <TouchableOpacity onPress={switchCamera}>
      <SimpleLineIcons style={globals.textShadow} name="refresh" size={24} color={colors.text} />
    </TouchableOpacity>
  );
}
