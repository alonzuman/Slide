import React from "react";
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
    <Chip
      size="m"
      onPress={() => (!isHandRaised ? raiseHand() : unraiseHand())}
      renderLabel={
        <Typography style={streamControlsStyles.streamControlText} variant="h4">
          👋
        </Typography>
      }
    />
  );
}
