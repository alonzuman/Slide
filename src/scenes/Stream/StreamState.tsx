import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typography from '../../core/Typography'
import useStream from '../../hooks/useStream'

export default function StreamState() {
  const {
    meta,
    audience,
    speakers,
    members,
    onStage,
    guests,
    invites,
    streamID,
  } = useStream()

  return (
    <SafeAreaView>
      <ScrollView>
        <Typography>{JSON.stringify({ streamID, meta, members, onStage, speakers, guests, invites }, null, 2)}</Typography>
      </ScrollView>
    </SafeAreaView>
  )
}
