import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { ClientRole } from 'react-native-agora'
import Typography from '../../core/Typography'
import useStream, { useStreamID, useStreamIsJoined, useStreamMeta, useStreamOnStage, useStreamSpeakers } from '../../hooks/useStream'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useUser } from '../../hooks/useUser'
import StreamHeaderSpeakers from './StreamHeaderSpeakers'
import { useAppDispatch } from '../../store'
import Constants from '../../constants/Constants'
import useModal from '../../hooks/useModal'
import { useTheme } from '../../hooks/useTheme'
import DefaultButton from '../../core/DefaultButton'

export default function StreamHeader() {
  const { setOptions, goBack, navigate } = useNavigation()
  const { updateClientRole } = useStream()
  const { user } = useUser()
  const isJoined = useStreamIsJoined()
  const streamID = useStreamID()
  const onStage = useStreamOnStage()
  const meta = useStreamMeta()
  const { openModal, closeModal } = useModal()
  const { colors } = useTheme()
  const isSpeaker = onStage?.includes(user?._id)

  console.log('re-rendered header', user?.name)

  useEffect(() => {
    // Checks if current user is a speaker and if so, pushes it to the speakers and changes role
    updateClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)
  }, [isSpeaker])

  const handleMorePress = () => {
    openModal({
      title: meta?.name,
      renderAfter: (
        <DefaultButton
          onPress={() => {
            navigate('Feedback', {
              type: Constants.FeedbackTypes.REPORT_STREAM,
              entityID: streamID,
              headerTitle: `Report ${meta?.name}`
            })
            closeModal()
          }}
          size='l'
          labelStyle={{ color: colors.error }}
          title='Report'
        />
      ),
      type: 'GENERAL/SELECT'
    })
  }

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleMorePress} style={{ marginRight: 12 }}>
            <MaterialIcons name='more-horiz' size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity onPress={goBack} style={{ marginRight: 12 }}>
            <Entypo name='chevron-down' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
      ),
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => !isJoined ? <ActivityIndicator style={{ marginLeft: 12 }} /> : <Typography style={{ marginLeft: 12, color: '#fff' }} variant='h3'>{meta?.name}</Typography>
    })
  }, [setOptions, isJoined, meta?.name, streamID])

  return (
    <StreamHeaderSpeakers />
  )
}
