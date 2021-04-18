import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { RtcLocalView, RtcRemoteView } from 'react-native-agora'
import { useDispatch } from 'react-redux'
import Avatar from '../../core/Avatar'
import Typography from '../../core/Typography'
import { useStream } from '../../hooks/useStream'
import { useUser } from '../../hooks/useUser'
import { streamUpdated } from '../../slices/stream'

export default function StreamActiveSpeaker() {
  const { speakers, activeSpeaker, audioMuted, videoMuted, streamID } = useStream()
  const { user } = useUser()
  const isMe = activeSpeaker === user?.streamID
  const isVideoMuted = videoMuted?.includes(activeSpeaker)
  const isAudioMuted = audioMuted?.includes(activeSpeaker)
  const dispatch = useDispatch()

  useEffect(() => {
    if (speakers?.length === 1) {
      dispatch(streamUpdated({ activeSpeaker: speakers?.[0]?.streamID }))
    }
  }, [speakers?.length])

  const _renderView = () => {
    if (isMe && !isVideoMuted) return <RtcLocalView.SurfaceView uid={user?.streamID} style={styles.speaker} />
    if (isMe && isVideoMuted) return <View style={styles.speaker}><Avatar size='xxxl' uri={user?.avatar} /></View>
    if (!isMe && !isVideoMuted) return <RtcRemoteView.SurfaceView uid={activeSpeaker} channelId={streamID} style={styles.speaker} />
    if (!isMe && isVideoMuted) return <View style={styles.speaker}><Avatar size='xxxl' uri={user?.avatar} /></View>
  }

  if (!activeSpeaker) return null;

  return (
    <View style={{ ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' }}>
      <Typography>{activeSpeaker}</Typography>
      {_renderView()}
    </View>
  )
}

const styles = StyleSheet.create({
  speaker: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
