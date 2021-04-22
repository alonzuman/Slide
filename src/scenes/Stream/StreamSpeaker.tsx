import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { RtcLocalView, RtcRemoteView } from 'react-native-agora';
import IconButton from '../../core/IconButton';
import Typography from '../../core/Typography'
import useStreamSpeakers from '../../hooks/useStreamSpeakers';
import { useUser } from '../../hooks/useUser'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '../../hooks/useTheme';
import useStreamMembers from '../../hooks/useStreamMembers';

const HEIGHT = 164;
const WIDTH = HEIGHT / 2

type Props = {
  name: string,
  userID: string,
  avatar: string,
  speakerID: number
}

export default function StreamSpeaker({ avatar, userID, speakerID, name, style }: Props) {
  const { streamID } = useStreamMembers()
  const { setActiveSpeaker, audioMuted, videoMuted } = useStreamSpeakers()
  const { user } = useUser()
  const { colors } = useTheme()
  const isAudioMuted = audioMuted?.includes(speakerID)
  const isVideoMuted = videoMuted?.includes(speakerID)
  const isMe = userID === user?._id

  const _renderView = () => {
    if (isVideoMuted) return <Image source={{ uri: avatar }} style={styles.speaker} />
    if (!isMe) return <RtcRemoteView.SurfaceView uid={speakerID} zOrderMediaOverlay={false} style={styles.speaker} channelId={streamID} />
    if (isMe) return <RtcLocalView.SurfaceView style={styles.speaker} zOrderMediaOverlay={false} />
  }

  return (
    <TouchableOpacity activeOpacity={.8} onPress={() => setActiveSpeaker(speakerID)}>
      <View style={{ ...styles.container, ...style }}>
        <View style={styles.speakerContainer}>
          {_renderView()}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 24 }}>
          <Typography style={styles.name}>{name?.split(' ')?.[0]}</Typography>
          {isAudioMuted && (
            <IconButton size='xs' style={{ backgroundColor: colors.cardAlt, marginLeft: 4 }}>
              <MaterialCommunityIcons color='#fff' name='microphone-off' size={16} />
            </IconButton>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    alignItems: 'center',
    marginBottom: 8
  },

  imageContainer: {
    position: 'relative'
  },

  speakerContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#00000050',
    borderRadius: 12,
    height: HEIGHT + 2,
    width: WIDTH + 2,
    marginBottom: 8,
    overflow: 'hidden'
  },

  speaker: {
    height: HEIGHT,
    width: WIDTH,
  },

  name: {
    fontWeight: '600'
  }
})
