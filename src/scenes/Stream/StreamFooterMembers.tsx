import React from "react";
import { useStreamAudience, useStreamRaisedHands } from "../../hooks/useStream";
import useStreamLayout from "../../hooks/useStreamLayout";
import AvatarsGroup from "../../core/AvatarsGroup";
import { View } from "react-native";
import Typography from "../../core/Typography";
import IconButton from "../../core/IconButton";

export default function StreamFooterMembers() {
  const audience = useStreamAudience();
  const raisedHands = useStreamRaisedHands();
  const { setOpenModal } = useStreamLayout();
  const isHandRaised = raisedHands?.length > 0;

  const handlePress = () => setOpenModal("STREAM_MODALS/MEMBERS");

  return (
    <View style={{ position: "relative" }}>
      <AvatarsGroup onPress={handlePress} users={audience} />
      {isHandRaised && (
        <IconButton
          size="s"
          style={{ position: "absolute", top: -8, right: -8 }}
          onPress={handlePress}
        >
          <Typography style={{ fontSize: 10 }}>👋</Typography>
        </IconButton>
      )}
    </View>
  );
}
