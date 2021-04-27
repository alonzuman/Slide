import React, { Suspense, useEffect, useState } from 'react'
import { FlatList, Animated } from 'react-native'
import { ClientRole } from 'react-native-agora'
import useStreamLayout from '../../hooks/useStreamLayout'
import useStream, { useStreamSpeakers } from '../../hooks/useStream'
import { useUser } from '../../hooks/useUser'
import StreamSpeaker from './StreamSpeaker'

export default function StreamSpeakers() {
  const { onStage, updateClientRole } = useStream()
  const { layout } = useStreamLayout()
  const { user } = useUser()
  const bottom = useState(new Animated.Value(0))[0]
  const isSpeaker = onStage?.includes(user?._id)
  const [streamSpeakers] = useStreamSpeakers()
  console.log({ streamSpeakers }, user?.name)

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
    updateClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)
  }, [onStage])

  return (
    <Animated.View style={{ bottom }}>
      <FlatList
        // data={speakers?.filter(v => v?.streamID !== activeSpeaker)}
        data={streamSpeakers}
        keyExtractor={item => item?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Suspense fallback={null}>
            <StreamSpeaker
              style={{ marginLeft: index === 0 ? 12 : 0, marginRight: 12 }}
              speakerID={item}
            />
          </Suspense>
        )}
      />
    </Animated.View>
  )
}
