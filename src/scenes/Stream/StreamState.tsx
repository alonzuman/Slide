import React from 'react'
import { ScrollView } from 'react-native'
import Typography from '../../core/Typography'
import useStreamMembers from '../../hooks/useStreamMembers'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'

export default function StreamState() {
  const { meta, audience, members, onStage, guests, invites } = useStreamMembers()
  const { speakers, role, isJoined, videoMuted, audioMuted } = useStreamSpeakers()

  return (
    <ScrollView>
      <Typography>{JSON.stringify({ meta, members, onStage, guests, invites }, null, 2)}</Typography>
      <Typography>{JSON.stringify({ speakers, role, isJoined, videoMuted, audioMuted }, null, 2)}</Typography>
    </ScrollView>
  )
}
