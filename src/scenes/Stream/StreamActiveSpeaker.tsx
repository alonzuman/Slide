import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { RtcLocalView, RtcRemoteView } from "react-native-agora";
import Avatar from "../../core/Avatar";
import { useUser } from "../../hooks/useUser";
import useStream, {
  useStreamActiveSpeaker,
  useStreamAudioMuted,
  useStreamID,
  useStreamSpeakers,
  useStreamVideoMuted,
} from "../../hooks/useStream";
import StreamAudioMutedOverlay from "./StreamAudioMutedOverlay";

export default function StreamActiveSpeaker() {
  const { setActiveSpeaker } = useStream();
  const { user } = useUser();
  const streamID = useStreamID();
  const speakers = useStreamSpeakers();
  const activeSpeaker = useStreamActiveSpeaker();
  const videoMuted = useStreamVideoMuted();
  const audioMuted = useStreamAudioMuted();
  const activeSpeakerData = speakers?.find(
    (v) => v?.streamID === activeSpeaker
  );
  const isMe = activeSpeaker === user?.streamID;
  const isVideoMuted = videoMuted?.includes(activeSpeaker);
  const isAudioMuted = audioMuted?.includes(activeSpeaker);

  useEffect(() => {
    if (speakers?.length === 1) {
      setActiveSpeaker(speakers?.[0]?.streamID);
    }
  }, [speakers?.length]);

  const _renderView = () => {
    if (isVideoMuted)
      return (
        <View style={styles.speaker}>
          <View style={styles.avatarContainer}>
            <Avatar size="xxxl" uri={activeSpeakerData?.avatar} />
          </View>
        </View>
      );
    if (!isMe)
      return (
        <RtcRemoteView.SurfaceView
          uid={activeSpeaker}
          style={styles.speaker}
          channelId={streamID}
        />
      );
    return <RtcLocalView.SurfaceView style={styles.speaker} />;
  };

  if (!activeSpeaker) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isAudioMuted && <StreamAudioMutedOverlay />}
        {_renderView()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  speaker: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarContainer: {
    position: "relative",
  },
});
