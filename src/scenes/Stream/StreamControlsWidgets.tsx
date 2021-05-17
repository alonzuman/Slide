import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../../hooks/useTheme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useStreamLayout from "../../hooks/useStreamLayout";

export default function StreamControlsWidgets() {
  const { setOpenModal } = useStreamLayout();
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{ marginHorizontal: 12 }}
      onPress={() => setOpenModal("STREAM_MODALS/WIDGETS")}
    >
      <MaterialCommunityIcons
        name="sticker-emoji"
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  );
}
