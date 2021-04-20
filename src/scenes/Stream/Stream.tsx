import React, { useEffect } from 'react'
import KeepAwake from 'react-native-keep-awake'
import Typography from '../../core/Typography';
import useStreamMembers from '../../hooks/useStreamMembers';
import useStreamSpeakers from '../../hooks/useStreamSpeakers';
import StreamActiveSpeaker from './StreamActiveSpeaker';
import StreamFooter from './StreamFooter';
import StreamHeader from './StreamHeader';
import StreamModals from './StreamModals';
import StreamOverlay from './StreamOverlay';


export default function Stream({ route }) {
  const { streamID } = route.params;
  const { joinStream, leaveStream } = useStreamSpeakers()
  const { initListeners, clearListeners } = useStreamMembers()

  useEffect(() => {
    joinStream(streamID)
    initListeners()

    return () => {
      leaveStream()
      clearListeners()
    }
  }, [])

  return (
    <>
      <KeepAwake />
      <StreamHeader />
      <StreamActiveSpeaker />
      <StreamOverlay />
      <StreamFooter />
      <StreamModals />
    </>
  )
}
