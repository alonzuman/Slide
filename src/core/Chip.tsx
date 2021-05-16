import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "../constants/Constants";
import { useTheme } from "../hooks/useTheme";
import { Sizes } from "../types";
import Typography from "./Typography";

type Props = {
  label?: string;
  onPress?: Function | null;
  style?: ViewStyle;
  size?: Sizes;
  isSelected?: boolean;
  renderLabel?: ReactNode;
};

const sizes = {
  xs: 24,
  s: 32,
  m: 40,
  l: 48,
  xl: 56,
  xxl: 64,
  xxxl: 72,
};

const paddingsHorizontal = {
  xs: 8,
  s: 12,
  m: 16,
  l: 16,
  xl: 16,
  xxl: 16,
  xxxl: 16,
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
        borderColor: isSelected ? colors.secondaryDark : colors.border,
        height: sizes[size],
        justifyContent: "center",
        paddingHorizontal: paddingsHorizontal[size],
        borderRadius: sizes[size] / Constants.Theme.shape.CHIP_DIVIDER,
        backgroundColor: colors.card,
        ...style,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {renderLabel}
      {!!label && (
        <Typography
          variant="subtitle"
          style={{ color: isSelected ? colors.secondaryDark : colors.text, fontWeight: "400" }}
        >
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
