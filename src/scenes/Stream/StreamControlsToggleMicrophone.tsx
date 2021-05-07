import React from "react";
import { View, Text } from "react-native";
import Chip from "../../core/Chip";
import useStream, { useStreamAudioMutedSpeaker } from "../../hooks/useStream";
import { useUserStreamID } from "../../hooks/useUser";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../hooks/useTheme";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function StreamControlsToggleMicrophone() {
  const { unMuteLocalAudio, muteLocalAudio } = useStream();
  const userStreamID = useUserStreamID();
  const isAudioMuted = useStreamAudioMutedSpeaker(userStreamID);
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => (isAudioMuted ? unMuteLocalAudio() : muteLocalAudio())}
    >
      <MaterialCommunityIcons
        color={colors.text}
        size={24}
        name={`microphone${isAudioMuted ? "-off" : ""}`}
      />
    </TouchableOpacity>
  );
}
