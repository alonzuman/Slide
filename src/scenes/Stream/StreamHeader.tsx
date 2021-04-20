import { useNavigation } from '@react-navigation/core'
import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Constants from '../../constants/Constants'
import Avatar from '../../core/Avatar'
import HeaderLeft from '../../core/HeaderLeft'
import ListItem from '../../core/ListItem'
import Typography from '../../core/Typography'
import useStreamLayout from '../../hooks/useStreamLayout'
import useStreamMeta from '../../hooks/useStreamMeta'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'

export default function StreamHeader() {
  const { setOptions } = useNavigation()
  const insets = useSafeAreaInsets()
  const { openModal } = useStreamLayout()
  const { meta, streamID } = useStreamMeta()
  const { activeSpeaker, speakers } = useStreamSpeakers()
  const activeSpeakerData = speakers?.find(v => v?.streamID === activeSpeaker)

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => <HeaderLeft mode='modal' />,
      headerTransparent: true,
      headerTitle: meta.name
    })
  }, [setOptions, meta, streamID])

  return (
    <ListItem
      onPress={() => openModal(Constants.StreamModals.ON_STAGE)}
      style={{ marginTop: insets.top + 48, marginLeft: 12, flexDirection: 'row', alignItems: 'center' }}
      renderBefore={<Avatar uri={activeSpeakerData?.avatar} />}
      primary={activeSpeakerData?.name}
      label='On Stage'
    />
  )
}
