import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Sizes } from "../types";
import BlurWrapper from "./BlurWrapper";

type Props = {
  size?: Sizes;
  children?: any;
  onPress?: Function;
  card?: boolean;
  elevation?: 0 | 1 | 2;
  variant?: "blur" | "outlined" | "";
  style?: ViewStyle;
};

export default function IconButton({
  elevation = 1,
  card = false,
  size = "m",
  children,
  onPress,
  style,
  variant = "outlined",
}: Props) {
  const { colors } = useTheme();
  const sizes = {
    xs: 18,
    s: 24,
    m: 32,
    l: 48,
    xl: 80,
    xxl: 112,
    xxxl: 200,
  };

  // const borderRadius = sizes[size] / 2.4
  const borderRadius = sizes[size] / 2;

  const shadows =
    elevation === 0
      ? null
      : {
          shadowColor: "#00000055",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 5,
        };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor: variant === "outlined" ? colors.card : "transparent",
        height: sizes[size],
        width: sizes[size],
        borderRadius,
        alignItems: "center",
        borderWidth: 1,
        borderColor: variant === "outlined" ? colors.border : "transparent",
        justifyContent: "center",
        ...shadows,
        ...style,
      }}
      onPress={onPress}
    >
      {variant === "blur" ? (
        <BlurWrapper
          style={{
            height: sizes[size],
            width: sizes[size],
            borderRadius,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </BlurWrapper>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
