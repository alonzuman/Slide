import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Chip from "../../core/Chip";
import Typography from "../../core/Typography";
import useStream, { useStreamRaisedHands } from "../../hooks/useStream";
import { useUserID } from "../../hooks/useUser";
import { streamControlsStyles } from "./styles";

export default function StreamControlsRaiseHand() {
  const { raiseHand, unraiseHand } = useStream();
  const raisedHands = useStreamRaisedHands();
  const userID = useUserID();
  const isHandRaised = raisedHands?.includes(userID);

  return (
    <TouchableOpacity
      style={{ marginHorizontal: 12 }}
      onPress={() => (!isHandRaised ? raiseHand() : unraiseHand())}
    >
      <Typography style={streamControlsStyles.streamControlText} variant="h4">
        👋
      </Typography>
    </TouchableOpacity>
  );
}
