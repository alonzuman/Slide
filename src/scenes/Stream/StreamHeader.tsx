import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, Animated, TouchableOpacity } from 'react-native'
import { ClientRole } from 'react-native-agora'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Constants from '../../constants/Constants'
import Avatar from '../../core/Avatar'
import ListItem from '../../core/ListItem'
import Typography from '../../core/Typography'
import useStreamLayout from '../../hooks/useStreamLayout'
import useStreamMembers from '../../hooks/useStreamMembers'
import useStreamMeta from '../../hooks/useStreamMeta'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'
import Entypo from 'react-native-vector-icons/Entypo'
import { useUser } from '../../hooks/useUser'

export default function StreamHeader() {
  const { setOptions, goBack } = useNavigation()
  const insets = useSafeAreaInsets()
  const { openModal, layout } = useStreamLayout()
  const { meta, streamID } = useStreamMeta()
  const { isJoined, activeSpeaker, speakers, updateClientRole } = useStreamSpeakers()
  const { onStage } = useStreamMembers()
  const { user } = useUser()
  const left = useState(new Animated.Value(0))[0]
  const activeSpeakerData = speakers?.find(v => v?.streamID === activeSpeaker)
  const isSpeaker = onStage?.includes(user?._id)

  const slideLeft = () => {
    Animated.spring(left, {
      toValue: layout?.isZenMode ? -256 : 0,
      useNativeDriver: false
    }).start()
  }

  useEffect(() => {
    slideLeft()
  }, [layout?.isZenMode])

  useEffect(() => {
    // Checks if current user is a speaker and if so, pushes it to the speakers and changes role
    updateClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)
  }, [isSpeaker])

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => <TouchableOpacity onPress={goBack} style={{ marginRight: 12 }}><Entypo name='chevron-down' size={24} color={'#fff'} /></TouchableOpacity>,
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => !isJoined ? <ActivityIndicator style={{ marginLeft: 12 }} /> : <Typography style={{ marginLeft: 12 }} variant='h3'>{meta?.name}</Typography>
    })
  }, [setOptions, isJoined, meta?.name, streamID])

  if (!activeSpeaker) return null

  return (
    <Animated.View style={{ zIndex: 9, marginLeft: left }}>
      <ListItem
        onPress={() => openModal(Constants.StreamModals.ON_STAGE)}
        style={{
          backgroundColor: '#00000050',
          alignSelf: 'flex-start',
          borderRadius: 24,
          padding: 4,
          zIndex: 9,
          marginTop: insets.top + 40,
          marginLeft: 12,
          flexDirection: 'row',
          alignItems: 'center'
        }}
        renderBefore={<Avatar style={{ marginRight: -8 }} size='m' uri={activeSpeakerData?.avatar} />}
        primary={`${activeSpeakerData?.name} ${speakers?.length > 1 ? `and ${speakers?.length - 1} more` : ''}`}
        label='On Stage 🎙️'
      />
    </Animated.View>
  )
}
