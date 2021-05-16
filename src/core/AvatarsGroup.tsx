import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "../constants/Constants";
import { useTheme } from "../hooks/useTheme";
import { UserProfile } from "../types";
import Avatar from "./Avatar";
import IconButton from "./IconButton";
import Typography from "./Typography";

const sizes = {
  xs: 18,
  s: 24,
  m: 32,
  l: 40,
  xl: 56,
  xxl: 112,
  xxxl: 200,
};

type Props = {
  max?: number;
  size?: "xs" | "s" | "m" | "l";
  users?: UserProfile[];
  onPress?: Function;
  style?: ViewStyle;
  borderColor?: string;
  showMore?: boolean;
};

export default function AvatarsGroup({
  showMore = true,
  onPress,
  users,
  size = "s",
  max = 2,
  style,
  borderColor = "transparent",
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.container, ...style }}
    >
      {users?.map(({ avatar }, index) => {
        if (index < max)
          return (
            <Avatar
              uri={avatar}
              size={size}
              key={avatar}
              style={{
                marginLeft: index === 0 ? 0 : size === "m" ? -12 : -8,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor,
              }}
            />
          );
      })}
      {showMore && users?.length > max && (
        <IconButton
          borderRadiusDivider={Constants.Theme.shape.AVATAR_DIVIDER}
          size={size}
          style={{ marginLeft: size === "m" ? -12 : -8 }}
        >
          <Typography variant="body">+{users?.length - max}</Typography>
        </IconButton>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
