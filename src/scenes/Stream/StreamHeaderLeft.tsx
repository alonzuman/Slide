import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import AvatarsGroup from '../../core/AvatarsGroup'
import IconButton from '../../core/IconButton'
import Typography from '../../core/Typography'
import { useStreamAudience, useStreamIsJoined, useStreamMembers, useStreamMeta, useStreamRaisedHands } from '../../hooks/useStream'
import useStreamLayout from '../../hooks/useStreamLayout'

export default function StreamHeaderLeft() {
  const { setOpenModal } = useStreamLayout()
  const meta = useStreamMeta()
  const audience = useStreamAudience()
  const isJoined = useStreamIsJoined()
  const raisedHands = useStreamRaisedHands()
  const members = useStreamMembers()
  const activeRaisedHands = raisedHands?.filter(v => members?.includes(v))

  return (
    <TouchableOpacity activeOpacity={.8} onPress={() => setOpenModal('STREAM_MODALS/ON_STAGE')}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}>
        <View style={{ position: 'relative' }}>
          <AvatarsGroup borderColor='#fff' users={audience} max={2} style={{ marginRight: 8 }} />
          {activeRaisedHands?.length > 0 && (
            <IconButton style={{ position: 'absolute', top: -8, right: -4 }} size='xs' card>
              <Typography style={{ fontSize: 10 }}>👋</Typography>
            </IconButton>
          )}
        </View>
        {!!meta?.name && <Typography style={{ marginRight: 8, color: '#fff' }} variant='h3'>{meta?.name}</Typography>}
        {!isJoined && <ActivityIndicator />}
      </View>
    </TouchableOpacity>
  )
}
