import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useTheme } from "../hooks/useTheme";
import Typography from "./Typography";

export default function LiveIndicator() {
  const { colors } = useTheme();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(opacity === 1 ? 0 : 1);
    }, 1000);
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.indicator,
          backgroundColor: colors.error,
          opacity,
        }}
      />
      <Typography style={{ color: colors.error }} variant="h4">
        Live
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  indicator: {
    height: 6,
    width: 6,
    borderRadius: 6,
    marginRight: 4,
  },
});
