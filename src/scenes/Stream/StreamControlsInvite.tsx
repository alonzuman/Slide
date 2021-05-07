import React from "react";
import Feather from "react-native-vector-icons/Feather";
import useStreamLayout from "../../hooks/useStreamLayout";
import { useTheme } from "../../hooks/useTheme";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function StreamControlsInvite() {
  const { setOpenModal } = useStreamLayout();
  const { colors } = useTheme();
  const handlePress = () => setOpenModal("STREAM_MODALS/INVITES");

  return (
    <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={handlePress}>
      <Feather color={colors.text} name={"send"} size={24} />
    </TouchableOpacity>
  );
}
