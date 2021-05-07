import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../hooks/useTheme";
import Typography from "./Typography";

type Props = {
  label?: string;
  onPress?: Function | null;
  style?: ViewStyle;
  size?: "s" | "m";
  isSelected?: boolean;
  renderLabel?: ReactNode;
};

export default function Chip({
  size = "s",
  onPress,
  isSelected = false,
  label,
  style,
  renderLabel,
}: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        borderColor: isSelected ? colors.primary : colors.border,
        height: size === "s" ? 32 : 40,
        justifyContent: "center",
        paddingHorizontal: size === "s" ? 12 : 16,
        borderRadius: 32,
        backgroundColor: colors.card,
        ...style,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {renderLabel}
      {!!label && (
        <Typography variant="subtitle" style={{ fontWeight: "400" }}>
          {label}
        </Typography>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
