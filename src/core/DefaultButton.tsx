import React, { ReactElement } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import Typography from "./Typography";

type Props = {
  size?: "s" | "m" | "l";
  title?: string;
  style?: ViewStyle;
  renderBefore?: ReactElement;
  renderAfter?: ReactElement;
  isLoading?: boolean;
  labelStyle?: TextStyle;
  onPress?: any;
  disabled?: boolean;
};

export default function DefaultButton({
  disabled = false,
  onPress,
  labelStyle,
  style,
  isLoading,
  renderBefore,
  renderAfter,
  size = "m",
  title,
}: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => (disabled ? null : onPress?.())}
      activeOpacity={0.8}
      style={{
        height: size === "s" ? 32 : size === "m" ? 48 : 64,
        borderColor: "transparent",
        borderWidth: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        borderRadius: 8,
        paddingHorizontal: 8,
        justifyContent: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      {renderBefore}
      {isLoading ? (
        <ActivityIndicator color={colors.secondaryDark} />
      ) : (
        <Typography
          variant="h4"
          style={{
            fontWeight: "500",
            color: disabled ? colors.border : colors.secondaryDark,
            fontSize: size === "l" ? 18 : 16,
            ...labelStyle,
          }}
        >
          {title}
        </Typography>
      )}
      {renderAfter}
    </TouchableOpacity>
  );
}
