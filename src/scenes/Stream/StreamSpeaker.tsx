import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RtcLocalView, RtcRemoteView } from "react-native-agora";
import IconButton from "../../core/IconButton";
import Typography from "../../core/Typography";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import useStream, {
  useStreamAudioMuted,
  useStreamID,
  useStreamSpeaker,
  useStreamVideoMuted,
} from "../../hooks/useStream";
import StreamAudioMutedOverlay from "./StreamAudioMutedOverlay";

const HEIGHT = 164;
const WIDTH = HEIGHT / 2;

type Props = {
  name: string;
  userID: string;
  avatar: string;
  speakerID: number;
};

export default function StreamSpeaker({ speakerID, style }: Props) {
  const { setActiveSpeaker } = useStream();
  const { avatar, _id: userID, name } = useStreamSpeaker(speakerID);
  const streamID = useStreamID();
  const audioMuted = useStreamAudioMuted();
  const videoMuted = useStreamVideoMuted();
  const { user } = useUser();
  const { colors } = useTheme();
  const isAudioMuted = audioMuted?.includes(speakerID);
  const isVideoMuted = videoMuted?.includes(speakerID);
  const isMe = userID === user?._id;

  console.log("re rendered speaker", user?.name);

  const _renderView = () => {
    if (isVideoMuted)
      return <Image source={{ uri: avatar }} style={styles.speaker} />;
    if (!isMe)
      return (
        <RtcRemoteView.SurfaceView
          uid={speakerID}
          zOrderMediaOverlay={false}
          style={styles.speaker}
          channelId={streamID}
        />
      );
    if (isMe)
      return (
        <RtcLocalView.SurfaceView
          style={styles.speaker}
          zOrderMediaOverlay={false}
        />
      );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setActiveSpeaker(speakerID)}
    >
      <View style={{ ...styles.container, ...style }}>
        <View style={styles.speakerContainer}>
          {_renderView()}
          {isAudioMuted && <StreamAudioMutedOverlay />}
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", height: 24 }}
        >
          <Typography variant="h4" style={styles.name}>
            {name?.split(" ")?.[0]}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    alignItems: "center",
    marginBottom: 8,
  },

  imageContainer: {
    position: "relative",
  },

  speakerContainer: {
    backgroundColor: "#00000050",
    borderRadius: 12,
    marginBottom: 4,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  speaker: {
    height: HEIGHT,
    width: WIDTH,
  },

  name: {
    color: "#fff",
  },
});
