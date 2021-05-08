import React, { useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { ClientRole } from "react-native-agora";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import globals from "../../globals";
import useScreenOptions from "../../hooks/useScreenOptions";
import useStream, {
  useStreamOnStage,
  useStreamUserRole,
} from "../../hooks/useStream";
import useStreamLayout from "../../hooks/useStreamLayout";
import { useUser, useUserID } from "../../hooks/useUser";
import StreamControlsMinimize from "./StreamControlsMinimize";
import StreamControlsFilters from "./StreamControlsFilters";
import StreamControlsSwitchCamera from "./StreamControlsSwitchCamera";
import StreamControlsToggleCamera from "./StreamControlsToggleCamera";
import StreamControlsToggleMicrophone from "./StreamControlsToggleMicrophone";

export default function StreamHeader() {
  const { updateClientRole } = useStream();
  const { user } = useUser();
  const onStage = useStreamOnStage();
  const isSpeaker = onStage?.includes(user?._id);
  const insets = useSafeAreaInsets();
  const top = useState(new Animated.Value(insets.top || 12))[0];
  const { isZenMode } = useStreamLayout();
  const userID = useUserID();
  const currentUserRole = useStreamUserRole(userID);

  const slide = () => {
    Animated.spring(top, {
      useNativeDriver: false,
      toValue: isZenMode ? -48 : insets.top || 12,
    }).start();
  };

  useScreenOptions({ headerShown: false });

  useEffect(() => {
    slide();
  }, [isZenMode]);

  useEffect(() => {
    updateClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience);
  }, [isSpeaker]);

  const options = [
    {
      role: "SPEAKER",
      component: <StreamControlsSwitchCamera />,
      key: "switch-camera",
    },
    {
      role: "SPEAKER",
      component: <StreamControlsToggleCamera />,
      key: "toggle-camera",
    },
    {
      role: "SPEAKER",
      component: <StreamControlsToggleMicrophone />,
      key: "toggle-mic",
    },
    {
      role: "SPEAKER",
      component: <StreamControlsFilters />,
      key: "filters",
    },
    {
      role: "ANY",
      component: <StreamControlsMinimize />,
      key: "exit",
    },
  ];

  return (
    <Animated.View
      style={{
        zIndex: 9,
        flexDirection: "row",
        justifyContent:
          currentUserRole === "AUDIENCE" ? "flex-end" : "space-between",
        alignItems: "flex-end",
        paddingHorizontal: 24,
        position: "absolute",
        right: 0,
        left: 0,
        top,
      }}
    >
      {options
        ?.filter((v) => v.role === currentUserRole || v.role === "ANY")
        ?.map(({ component, key }) => (
          <View style={globals.textShadow} key={key}>{component}</View>
        ))}
    </Animated.View>
  );
}
