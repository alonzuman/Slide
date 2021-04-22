import React, { useEffect, useState } from 'react'
import { FlatList, Animated } from 'react-native'
import { ClientRole } from 'react-native-agora'
import useStreamLayout from '../../hooks/useStreamLayout'
import useStream from '../../hooks/useStream'
import { useUser } from '../../hooks/useUser'
import StreamSpeaker from './StreamSpeaker'

export default function StreamSpeakers() {
  const { speakers, activeSpeaker, audioMuted, onStage, videoMuted, engine } = useStream()
  const { layout } = useStreamLayout()
  const { user } = useUser()
  const bottom = useState(new Animated.Value(0))[0]
  const isSpeaker = onStage?.includes(user?._id)

  const slideBottom = () => {
    Animated.spring(bottom, {
      toValue: layout?.isZenMode ? -320 : 0,
      useNativeDriver: false
    }).start()
  }

  useEffect(() => {
    slideBottom()
  }, [layout?.isZenMode])

  useEffect(() => {
    engine?.setClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)
  }, [onStage])

  return (
    <Animated.View style={{ bottom }}>
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
    </Animated.View>
  )
}
