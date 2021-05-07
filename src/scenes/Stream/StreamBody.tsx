import React from "react";
import { View, Pressable } from "react-native";
import useStreamLayout from "../../hooks/useStreamLayout";
import StreamActiveSpeaker from "./StreamActiveSpeaker";
import StreamControls from "./StreamControls";
import StreamFooter from "./StreamFooter";
import StreamSpeakers from "./StreamSpeakers";
import StreamWidgets from "./StreamWidgets";
import { streamBodyStyles as styles } from "./styles";

export default function StreamBody() {
  const { toggleZenMode } = useStreamLayout();

  return (
    <View style={styles.streamBody}>
      <StreamActiveSpeaker />
      {/* <StreamWidgets /> */}
      <Pressable onPress={toggleZenMode} style={styles.streamBodyOverlay} />
      <StreamSpeakers />
      <StreamFooter />
    </View>
  );
}
