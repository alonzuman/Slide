import React from "react";
import Chip from "../../core/Chip";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../hooks/useTheme";
import useStreamLayout from "../../hooks/useStreamLayout";

export default function StreamControlsFilters() {
  const { setOpenModal } = useStreamLayout();
  const { colors } = useTheme();

  const handlePress = () => setOpenModal("STREAM_MODALS/FILTERS");

  return (
    <Chip
      size="m"
      onPress={handlePress}
      renderLabel={
        <Ionicons
          name="md-color-filter-outline"
          color={colors.text}
          size={20}
        />
      }
    />
  );
}
