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
import StreamSpeakersProvider from '../../providers/StreamSpeakersProvider';
import StreamLayoutProvider from '../../providers/StreamLayoutProvider';
import StreamMembersProvider from '../../providers/StreamMembersProvider';
import StreamHeader from './StreamHeader';
import StreamMetaProvider from '../../providers/StreamMetaProvider';

export default function Stream({ route }) {
  const { streamID } = route.params;
  const { engine, socket } = useStreamProvider()
  const { user } = useUser()

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

  return (
    <StreamMetaProvider>
      <StreamLayoutProvider>
        <StreamSpeakersProvider>
          <StreamMembersProvider>
            <KeepAwake />
            <StreamHeader />
            <StreamActiveSpeaker />
            <StreamOverlay />
            <StreamFooter />
            <StreamModals />
          </StreamMembersProvider>
        </StreamSpeakersProvider>
      </StreamLayoutProvider>
    </StreamMetaProvider>
  )
}
