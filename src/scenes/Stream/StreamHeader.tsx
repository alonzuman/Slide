import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect } from 'react'
import { View } from 'react-native'
import { ClientRole } from 'react-native-agora'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Constants from '../../constants/Constants'
import Avatar from '../../core/Avatar'
import HeaderLeft from '../../core/HeaderLeft'
import ListItem from '../../core/ListItem'
import useStreamLayout from '../../hooks/useStreamLayout'
import useStreamMembers from '../../hooks/useStreamMembers'
import useStreamMeta from '../../hooks/useStreamMeta'
import { useStreamProvider } from '../../hooks/useStreamProvider'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'
import { useUser } from '../../hooks/useUser'

export default function StreamHeader() {
  const { setOptions } = useNavigation()
  const insets = useSafeAreaInsets()
  const { openModal } = useStreamLayout()
  const { meta, streamID } = useStreamMeta()
  const { activeSpeaker, speakers } = useStreamSpeakers()
  const { onStage } = useStreamMembers()
  const { user } = useUser()
  const { engine } = useStreamProvider()
  const activeSpeakerData = speakers?.find(v => v?.streamID === activeSpeaker)

  useEffect(() => {
    // Checks if current user is a speaker and if so, pushes it to the speakers and changes role
    const isSpeaker = onStage?.includes(user?._id)
    engine?.setClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)
  }, [onStage])

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => <HeaderLeft mode='modal' />,
      headerTransparent: true,
      headerTitle: meta.name
    })
  }, [setOptions, meta, streamID])

  if (!activeSpeaker) return null

  return (
    <ListItem
      onPress={() => openModal(Constants.StreamModals.ON_STAGE)}
      style={{
        backgroundColor: '#00000050',
        alignSelf: 'flex-start',
        borderRadius: 24,
        padding: 4,
        zIndex: 9,
        marginTop: insets.top + 48,
        marginLeft: 12,
        flexDirection: 'row',
        alignItems: 'center'
      }}
      renderBefore={<Avatar size='s' uri={activeSpeakerData?.avatar} />}
      primary={`${activeSpeakerData?.name} ${speakers?.length > 1 ? `and ${speakers?.length - 1} more` : ''}`}
      label='On Stage'
    />
  )
}
