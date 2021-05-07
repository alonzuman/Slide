import React from "react";
import { View, Text } from "react-native";
import Chip from "../../core/Chip";
import useStream, { useStreamAudioMutedSpeaker } from "../../hooks/useStream";
import { useUserStreamID } from "../../hooks/useUser";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../hooks/useTheme";

export default function StreamControlsToggleMicrophone() {
  const { unMuteLocalAudio, muteLocalAudio } = useStream();
  const userStreamID = useUserStreamID();
  const isAudioMuted = useStreamAudioMutedSpeaker(userStreamID);
  const { colors } = useTheme();

  return (
    <Chip
      onPress={() => (isAudioMuted ? unMuteLocalAudio() : muteLocalAudio())}
      size="m"
      renderLabel={
        <MaterialCommunityIcons
          color={colors.text}
          size={20}
          name={`microphone${isAudioMuted ? "-off" : ""}`}
        />
      }
    />
  );
}
