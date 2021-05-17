import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export default function StreamModalOptionWrapper({ children }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        height: 64,
        width: 64,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
}
