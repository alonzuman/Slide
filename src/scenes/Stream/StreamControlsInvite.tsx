import React from "react";
import Chip from "../../core/Chip";
import Feather from "react-native-vector-icons/Feather";
import useStreamLayout from "../../hooks/useStreamLayout";
import { useTheme } from "../../hooks/useTheme";

export default function StreamControlsInvite() {
  const { setOpenModal } = useStreamLayout();
  const { colors } = useTheme();
  const handlePress = () => setOpenModal("STREAM_MODALS/INVITES");

  return (
    <Chip
      size="m"
      onPress={handlePress}
      renderLabel={<Feather color={colors.text} name={"send"} size={20} />}
    />
  );
}
