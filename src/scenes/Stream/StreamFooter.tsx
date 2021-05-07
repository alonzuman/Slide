import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";
import StreamFooterAudience from "./StreamFooterAudience";
import StreamFooterControls from "./StreamFooterControls";
import { streamFooterAudienceStyles } from "./styles";

export default function StreamFooter() {
  const { colors } = useTheme();
  const styles = streamFooterAudienceStyles(colors);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: 8,
        paddingBottom: insets.bottom || 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View style={styles.footer}>
        <StreamFooterControls />
        <StreamFooterAudience />
      </View>
    </View>
  );
}
