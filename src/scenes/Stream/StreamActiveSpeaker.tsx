import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RtcLocalView, RtcRemoteView } from 'react-native-agora'
import Avatar from '../../core/Avatar'
import IconButton from '../../core/IconButton'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useUser } from '../../hooks/useUser'
import { useTheme } from '../../hooks/useTheme'
import LinearGradient from 'react-native-linear-gradient'
import useStream from '../../hooks/useStream'

export default function StreamActiveSpeaker() {
  const { streamID } = useStream()
  const { activeSpeaker, speakers, videoMuted, audioMuted } = useStreamSpeakers()
  const { user } = useUser()
  const { colors } = useTheme()
  const activeSpeakerData = speakers?.find(v => v?.streamID === activeSpeaker)
  const isMe = activeSpeaker === user?.streamID
  const isVideoMuted = videoMuted?.includes(activeSpeaker)
  const isAudioMuted = audioMuted?.includes(activeSpeaker)

  const _renderView = () => {
    if (isVideoMuted) return (
      <View style={styles.speaker}>
        <View style={styles.avatarContainer}>
          <Avatar size='xxxl' uri={activeSpeakerData?.avatar} />
          {isAudioMuted && (
            <IconButton style={{ position: 'absolute', bottom: 4, right: 4, backgroundColor: colors.cardAlt }}>
              <MaterialCommunityIcons color='#fff' name='microphone-off' size={24} />
            </IconButton>
          )}
        </View>
      </View>
    )
    if (!isMe) return <RtcRemoteView.SurfaceView uid={activeSpeaker} style={styles.speaker} channelId={streamID} />
    return <RtcLocalView.SurfaceView style={styles.speaker} />
  }

  if (!activeSpeaker) return null;

  return (
    <View style={{ ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' }}>
      {_renderView()}
      <LinearGradient colors={['#00000099', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', '#00000099']} style={styles.speaker} />
    </View>
  )
}

const styles = StyleSheet.create({
  speaker: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatarContainer: {
    position: 'relative'
  }
})
