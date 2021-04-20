import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { RtcLocalView, RtcRemoteView } from 'react-native-agora';
import Typography from '../../core/Typography'
import useStreamMeta from '../../hooks/useStreamMeta';
import useStreamSpeakers from '../../hooks/useStreamSpeakers';
import { useUser } from '../../hooks/useUser'

const HEIGHT = 164;
const WIDTH = HEIGHT / 2

type Props = {
  name: string,
  userID: string,
  avatar: string,
  speakerID: number
}

export default function StreamSpeaker({ avatar, userID, speakerID, name, style }: Props) {
  const { streamID } = useStreamMeta()
  const { setActiveSpeaker } = useStreamSpeakers()
  const { user } = useUser()
  const isMe = userID === user?._id

  const _renderView = () => {
    return <Image source={{ uri: avatar }} style={styles.speaker} />
    if (isMe) return <Image source={{ uri: avatar }} style={styles.speaker} />
    if (!isMe) return <RtcRemoteView.SurfaceView uid={speakerID} style={styles.speaker} channelId={streamID} />
    if (isMe) return <RtcLocalView.SurfaceView uid={speakerID} style={styles.speaker} />
    return <Image source={{ uri: avatar }} style={styles.speaker} />
  }

  return (
    <TouchableOpacity activeOpacity={.8} onPress={() => setActiveSpeaker(speakerID)}>
      <View style={{ ...styles.container, ...style }}>
        {_renderView()}
        <Typography style={styles.name}>{name?.split(' ')?.[0]}</Typography>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 8
  },

  speaker: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#00000050',
    borderRadius: 12,
    height: HEIGHT,
    width: WIDTH,
    marginBottom: 8
  },

  name: {
    fontWeight: '600'
  }
})
