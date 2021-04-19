import React, { useEffect, useLayoutEffect } from 'react'
import API from '../../API/API';
import { useStream } from '../../hooks/useStream';
import { useStreamProvider } from '../../hooks/useStreamProvider';
import { useUser } from '../../hooks/useUser';
import StreamActiveSpeaker from './StreamActiveSpeaker';
import StreamFooter from './StreamFooter';
import StreamModals from './StreamModals';
import StreamOverlay from './StreamOverlay';
import KeepAwake from 'react-native-keep-awake'
import HeaderLeft from '../../core/HeaderLeft';

export default function Stream({ route, navigation }) {
  const { streamID } = route.params;
  const { engine, socket } = useStreamProvider()
  const { data: user } = useUser()
  const stream = useStream()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeft mode='modal' />,
      headerTransparent: true,
      headerTitle: stream.meta.name
    })
  }, [navigation, stream.meta.name])

  useEffect(() => {
    // Join as Audience
    _joinStream()

    return async () => {
      await engine?.leaveChannel()
      socket?.emit('leave-stream', ({ streamID }))
    }
  }, [])

  const _joinStream = async () => {
    const token = await API.Streams.getStreamToken(streamID)
    // TODO leave channel and swith channel if needed
    await engine?.joinChannel(token, streamID, null, user?.streamID)
    socket?.emit('join-stream', ({ streamID }))
  }

  console.log(stream.videoMuted)
  console.log(stream.audioMuted)

  return (
    <>
      <KeepAwake />
      <StreamActiveSpeaker />
      <StreamOverlay />
      <StreamFooter />
      <StreamModals />
    </>
  )
}
