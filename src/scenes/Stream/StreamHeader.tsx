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
import useStream, { useStreamActiveSpeaker, useStreamID, useStreamIsJoined, useStreamMeta, useStreamOnStage, useStreamSpeakers } from '../../hooks/useStream'
import Entypo from 'react-native-vector-icons/Entypo'
import { useUser } from '../../hooks/useUser'
import StreamHeaderSpeakers from './StreamHeaderSpeakers'

export default function StreamHeader() {
  const { setOptions, goBack } = useNavigation()
  const { updateClientRole } = useStream()
  const { user } = useUser()
  const isJoined = useStreamIsJoined()
  const streamID = useStreamID()
  const onStage = useStreamOnStage()
  const meta = useStreamMeta()
  const isSpeaker = onStage?.includes(user?._id)

  console.log('re-rendered header', user?.name)

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

  return (
    <StreamHeaderSpeakers />
  )
}
