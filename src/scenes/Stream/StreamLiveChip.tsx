import React from "react";
import { View, Text } from "react-native";
import Chip from "../../core/Chip";
import LiveIndicator from "../../core/LiveIndicator";
import { useTheme } from "../../hooks/useTheme";
import { streamFooterAudienceStyles } from "./styles";

export default function StreamLiveChip() {
  const { colors } = useTheme();
  const styles = streamFooterAudienceStyles(colors);

  return (
    <Chip
      style={styles.streamChipLive}
      size="s"
      renderLabel={<LiveIndicator />}
    />
  );
}
