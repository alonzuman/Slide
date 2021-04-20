import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { ClientRole } from 'react-native-agora'
import Typography from '../../core/Typography'
import useStreamMembers from '../../hooks/useStreamMembers'
import { useStreamProvider } from '../../hooks/useStreamProvider'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'
import { useUser } from '../../hooks/useUser'
import StreamSpeaker from './StreamSpeaker'

export default function StreamSpeakers() {
  const { speakers, activeSpeaker, audioMuted, videoMuted } = useStreamSpeakers()
  const { onStage } = useStreamMembers()
  const { user } = useUser()
  const isSpeaker = onStage?.includes(user?._id)
  const { engine } = useStreamProvider()

  useEffect(() => {
    engine?.setClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)
  }, [onStage])

  return (
    <View>
      <FlatList
        data={speakers?.filter(v => v?.streamID !== activeSpeaker)}
        keyExtractor={item => item?._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <StreamSpeaker
            style={{ marginLeft: index === 0 ? 12 : 0, marginRight: 12 }}
            speakerID={item?.streamID}
            avatar={item?.avatar}
            name={item?.name}
            userID={item?._id}
          />
        )}
      />
    </View>
  )
}
