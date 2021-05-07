import React from "react";
import { FlatList, View } from "react-native";
import { useStreamIsJoined, useStreamUserRole } from "../../hooks/useStream";
import { useTheme } from "../../hooks/useTheme";
import { useUserID } from "../../hooks/useUser";
import StreamControlsFilters from "./StreamControlsFilters";
import StreamControlsInvite from "./StreamControlsInvite";
import StreamControlsMore from "./StreamControlsMore";
import StreamControlsRaiseHand from "./StreamControlsRaiseHand";
import StreamControlsSwitchCamera from "./StreamControlsSwitchCamera";
import StreamControlsToggleCamera from "./StreamControlsToggleCamera";
import StreamControlsToggleMicrophone from "./StreamControlsToggleMicrophone";
import { streamFooterAudienceStyles } from "./styles";

export default function StreamFooterAudienceTop() {
  const { colors } = useTheme();
  const styles = streamFooterAudienceStyles(colors);
  const isJoined = useStreamIsJoined();
  const userID = useUserID();
  const currentUserRole = useStreamUserRole(userID)

  const options = [
    {
      role: "AUDIENCE",
      component: <StreamControlsRaiseHand />,
      key: "raiseHand",
    },
    {
      role: "ANY",
      component: <StreamControlsInvite />,
      key: "invite",
    },
    {
      role: "ANY",
      component: <StreamControlsMore />,
      key: "more",
    },
  ];

  if (!isJoined) return null;

  return (
    <View style={styles.footerHeader}>
      <FlatList
        horizontal
        keyExtractor={(item) => item.key}
        data={options?.filter(
          (o) => o?.role === "ANY" || o?.role === currentUserRole
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => item.component}
      />
    </View>
  );
}
