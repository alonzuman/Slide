import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Constants from '../../constants/Constants'
import Avatar from '../../core/Avatar'
import BlurWrapper from '../../core/BlurWrapper'
import ListItem from '../../core/ListItem'
import { useStreamActiveSpeaker, useStreamSpeakers } from '../../hooks/useStream'
import useStreamLayout from '../../hooks/useStreamLayout'

export default function StreamHeaderSpeakers() {
  const insets = useSafeAreaInsets()
  const { layout, openModal } = useStreamLayout()
  const activeSpeaker = useStreamActiveSpeaker()
  const speakers = useStreamSpeakers()
  const activeSpeakerData = speakers?.find(v => v?.streamID === activeSpeaker)
  const left = useState(new Animated.Value(0))[0]

  useEffect(() => {
    slideLeft()
  }, [layout?.isZenMode])

  const slideLeft = () => {
    Animated.spring(left, {
      toValue: layout?.isZenMode ? -256 : 0,
      useNativeDriver: false
    }).start()
  }

  const _renderPrimary = () => {
    if (activeSpeakerData?.name) return `${activeSpeakerData?.name} ${speakers?.length > 1 ? `and ${speakers?.length - 1} more` : ''}`
    return `${speakers?.length} Speakers`
  }

  if (!activeSpeaker) return null

  return (
    <Animated.View style={{ zIndex: 9, marginLeft: left }}>
      <BlurWrapper
        style={{
          alignSelf: 'flex-start',
          borderRadius: 24,
          zIndex: 9,
          marginTop: insets.top + 40,
          marginLeft: 12,
        }}
      >
        <ListItem
          style={{ padding: 4 }}
          onPress={() => openModal(Constants.Modals.ON_STAGE)}
          renderBefore={<Avatar style={{ marginRight: -4 }} size='m' uri={activeSpeakerData?.avatar} />}
          primary={_renderPrimary()}
          primaryStyle={{ color: '#fff' }}
          labelStyle={{ color: '#fff' }}
          label='On Stage 🎙️'
        />
      </BlurWrapper>
    </Animated.View>
  )
}
