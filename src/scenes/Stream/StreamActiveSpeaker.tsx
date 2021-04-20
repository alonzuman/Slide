import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { RtcLocalView, RtcRemoteView } from 'react-native-agora'
import { useDispatch } from 'react-redux'
import Avatar from '../../core/Avatar'
import Typography from '../../core/Typography'
import useStreamMeta from '../../hooks/useStreamMeta'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'
import { useUser } from '../../hooks/useUser'

export default function StreamActiveSpeaker() {
  const { streamID } = useStreamMeta()
  const { activeSpeaker, speakers, videoMuted, audioMuted } = useStreamSpeakers()
  const { user } = useUser()
  const isMe = activeSpeaker === user?.streamID
  const isVideoMuted = videoMuted?.includes(activeSpeaker)
  const isAudioMuted = audioMuted?.includes(activeSpeaker)

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
