import React, { useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStreamLayout from "../../hooks/useStreamLayout";
import StreamFooterMembers from "./StreamFooterMembers";
import StreamFooterControls from "./StreamFooterControls";

export default function StreamFooter() {
  const insets = useSafeAreaInsets();
  const { isZenMode } = useStreamLayout();
  const bottom = useState(new Animated.Value(0))[0];

  const slideBottom = () => {
    Animated.spring(bottom, {
      toValue: isZenMode ? -320 : 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideBottom();
  }, [isZenMode]);

  return (
    <Animated.View
      style={{
        paddingBottom: insets.bottom || 12,
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        bottom
      }}
    >
      <StreamFooterMembers />
      <StreamFooterControls />
    </Animated.View>
  );
}
