import React from "react";
import useStream, { useStreamVideoMutedSpeaker } from "../../hooks/useStream";
import { useUserStreamID } from "../../hooks/useUser";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "../../hooks/useTheme";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function StreamControlsToggleCamera() {
  const { unMuteLocalVideo, muteLocalVideo } = useStream();
  const userStreamID = useUserStreamID();
  const isVideoMuted = useStreamVideoMutedSpeaker(userStreamID);
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => (isVideoMuted ? unMuteLocalVideo() : muteLocalVideo())}
    >
      <Feather
        color={colors.text}
        size={24}
        name={`video${isVideoMuted ? "-off" : ""}`}
      />
    </TouchableOpacity>
  );
}
