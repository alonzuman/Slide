import React, { ReactElement } from "react";
import { ActivityIndicator, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";
import Typography from "./Typography";

type Props = {
  size?: "s" | "m" | "l";
  title?: string;
  style?: ViewStyle;
  renderBefore?: ReactElement;
  renderAfter?: ReactElement;
  isLoading?: boolean;
  onPress?: any;
};

export default function SecondaryButton({
  onPress,
  style,
  isLoading,
  renderBefore,
  renderAfter,
  size = "m",
  title,
  ...rest
}: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        height: size === "s" ? 32 : size === "m" ? 48 : 64,
        borderColor: colors.border,
        borderWidth: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        borderRadius: 32,
        paddingHorizontal: 12,
        justifyContent: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      {renderBefore}
      {isLoading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <Typography
          variant="h4"
          style={{ fontWeight: "500", color: colors.text, fontSize: 16 }}
        >
          {title}
        </Typography>
      )}
      {renderAfter}
    </TouchableOpacity>
  );
}
