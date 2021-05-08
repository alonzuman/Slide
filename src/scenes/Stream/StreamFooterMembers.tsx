import React from "react";
import { useStreamAudience, useStreamRaisedHands } from "../../hooks/useStream";
import useStreamLayout from "../../hooks/useStreamLayout";
import AvatarsGroup from "../../core/AvatarsGroup";
import { View } from "react-native";
import Typography from "../../core/Typography";
import IconButton from "../../core/IconButton";
import { useNavigation } from "@react-navigation/core";

export default function StreamFooterMembers() {
  const audience = useStreamAudience();
  const raisedHands = useStreamRaisedHands();
  const { push } = useNavigation();
  const isHandRaised = raisedHands?.length > 0;

  const handlePress = () => push("Stream Members");

  return (
    <View style={{ position: "relative" }}>
      <AvatarsGroup onPress={handlePress} size='s' users={audience} />
      {isHandRaised && (
        <IconButton
          size="xs"
          style={{ position: "absolute", top: -8, right: -8 }}
          onPress={handlePress}
        >
          <Typography style={{ fontSize: 10 }}>👋</Typography>
        </IconButton>
      )}
    </View>
  );
}
