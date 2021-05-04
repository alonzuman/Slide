import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect } from 'react'
import { ClientRole } from 'react-native-agora'
import useStream, { useStreamID, useStreamIsJoined, useStreamMeta, useStreamOnStage, useStreamRole, useStreamSpeakers } from '../../hooks/useStream'
import { useUser } from '../../hooks/useUser'
import StreamHeaderLeft from './StreamHeaderLeft'
import StreamHeaderRight from './StreamHeaderRight'

export default function StreamHeader() {
  const { setOptions } = useNavigation()
  const { updateClientRole } = useStream()
  const { user } = useUser()
  const isJoined = useStreamIsJoined()
  const streamID = useStreamID()
  const onStage = useStreamOnStage()
  const meta = useStreamMeta()
  const speakers = useStreamSpeakers()

  const isSpeaker = onStage?.includes(user?._id)

  console.log('re-rendered header', user?.name)

  useEffect(() => {
    // TODO: check if current user is ALREADY a speaker, and if so, dont change his role

    // Checks if current user is a speaker and if so, pushes it to the speakers and changes role
    updateClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience)
  }, [isSpeaker])

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => <StreamHeaderRight />,
      headerLeft: () => <StreamHeaderLeft />,
      headerTransparent: true,
      headerTitle: '',
    })
  }, [setOptions, isJoined, meta?.name, streamID, speakers?.length])

  return null
}
