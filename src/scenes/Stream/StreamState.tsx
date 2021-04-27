import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typography from '../../core/Typography'
import useStream, { useStreamAudience, useStreamInvites, useStreamMembers, useStreamMeta, useStreamOnStage, useStreamSpeakers } from '../../hooks/useStream'

export default function StreamState() {
  const meta = useStreamMeta()
  const audience = useStreamAudience()
  const speakers = useStreamSpeakers()
  const members = useStreamMembers()
  const invites = useStreamInvites()
  const onStage = useStreamOnStage()


  return (
    <SafeAreaView>
      <ScrollView>
        <Typography>{JSON.stringify({ meta, members, onStage, speakers, invites }, null, 2)}</Typography>
      </ScrollView>
    </SafeAreaView>
  )
}
