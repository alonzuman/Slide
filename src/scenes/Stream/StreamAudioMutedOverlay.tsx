import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function StreamAudioMutedOverlay() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        zIndex: 9,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#00000050",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons
        color={colors.text}
        name="microphone-off"
        size={24}
      />
    </View>
  );
}
