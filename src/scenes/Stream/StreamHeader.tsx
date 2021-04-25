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
import useStream from '../../hooks/useStream'
import Entypo from 'react-native-vector-icons/Entypo'
import { useUser } from '../../hooks/useUser'
import BlurWrapper from '../../core/BlurWrapper'

const INTERVAL_TIMEOUT = 10000

export default function StreamHeader() {
  const { setOptions, goBack } = useNavigation()
  const insets = useSafeAreaInsets()
  const { openModal, layout } = useStreamLayout()
  const { meta, refetchStream, streamID, isJoined, activeSpeaker, speakers, updateClientRole } = useStream()
  const { onStage } = useStream()
  const { user } = useUser()
  const left = useState(new Animated.Value(0))[0]
  const activeSpeakerData = speakers?.find(v => v?.streamID === activeSpeaker)
  const isSpeaker = onStage?.includes(user?._id)

  useEffect(() => {
    let interval;

    if (streamID) {
      interval = setInterval(() => {
        refetchStream()
      }, INTERVAL_TIMEOUT)
    }

    return () => clearInterval(interval)
  }, [streamID])

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
      headerLeft: () => !isJoined ? <ActivityIndicator style={{ marginLeft: 12 }} /> : <Typography style={{ marginLeft: 12, color: '#fff' }} variant='h3'>{meta?.name}</Typography>
    })
  }, [setOptions, isJoined, meta?.name, streamID])

  if (!activeSpeaker) return null

  const _renderPrimary = () => {
    if (activeSpeakerData?.name) return `${activeSpeakerData?.name} ${speakers?.length > 1 ? `and ${speakers?.length - 1} more` : ''}`
    return `${speakers?.length} Speakers`
  }

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
          onPress={() => openModal(Constants.StreamModals.ON_STAGE)}
          renderBefore={<Avatar style={{ marginRight: -4 }} size='m' uri={activeSpeakerData?.avatar} />}
          primary={_renderPrimary()}
          label='On Stage 🎙️'
        />
      </BlurWrapper>
    </Animated.View>
  )
}
