import React from "react";
import { View, Text } from "react-native";
import Chip from "../../core/Chip";
import useStream, { useStreamVideoMutedSpeaker } from "../../hooks/useStream";
import { useUserStreamID } from "../../hooks/useUser";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../hooks/useTheme";

export default function StreamControlsToggleCamera() {
  const { unMuteLocalVideo, muteLocalVideo } = useStream();
  const userStreamID = useUserStreamID();
  const isVideoMuted = useStreamVideoMutedSpeaker(userStreamID);
  const { colors } = useTheme();

  return (
    <Chip
      size="m"
      onPress={() => (isVideoMuted ? unMuteLocalVideo() : muteLocalVideo())}
      renderLabel={
        <MaterialCommunityIcons
          color={colors.text}
          size={20}
          name={`camera${isVideoMuted ? "-off" : ""}`}
        />
      }
    />
  );
}
