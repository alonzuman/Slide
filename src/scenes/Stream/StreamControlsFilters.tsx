import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../hooks/useTheme";
import useStreamLayout from "../../hooks/useStreamLayout";
import { TouchableOpacity } from "react-native-gesture-handler";
import globals from "../../globals";

export default function StreamControlsFilters() {
  const { setOpenModal } = useStreamLayout();
  const { colors } = useTheme();

  const handlePress = () => setOpenModal("STREAM_MODALS/FILTERS");

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons
        style={globals.textShadow}
        name="md-color-filter-outline"
        color={colors.text}
        size={24}
      />
    </TouchableOpacity>
  );
}
