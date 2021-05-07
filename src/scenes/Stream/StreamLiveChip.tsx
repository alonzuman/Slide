import React from "react";
import { View, Text } from "react-native";
import Chip from "../../core/Chip";
import LiveIndicator from "../../core/LiveIndicator";
import { useStreamIsLive } from "../../hooks/useStream";
import { useTheme } from "../../hooks/useTheme";
import { Sizes } from "../../types";
import { streamLiveIndicatorStyles } from "./styles";

export default function StreamLiveChip({ size = "s" }: { size: Sizes }) {
  const { colors } = useTheme();
  const isLive = useStreamIsLive()
  const styles = streamLiveIndicatorStyles(colors, isLive);

  return (
    <Chip
      size={size}
      style={styles.root}
      renderLabel={<LiveIndicator />}
    />
  );
}
