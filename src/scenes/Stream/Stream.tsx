import React, { useEffect } from 'react'
import KeepAwake from 'react-native-keep-awake'
import useStreamMembers from '../../hooks/useStreamMembers';
import useStreamMeta from '../../hooks/useStreamMeta';
import useStreamSpeakers from '../../hooks/useStreamSpeakers';
import StreamActiveSpeaker from './StreamActiveSpeaker';
import StreamFooter from './StreamFooter';
import StreamHeader from './StreamHeader';
import StreamModals from './StreamModals';
import StreamOverlay from './StreamOverlay';

export default function Stream({ route }) {
  const { streamID } = route.params;
  const { updateMeta, streamID: activeStreamID } = useStreamMeta()
  const { joinStream } = useStreamSpeakers()
  const { initListeners } = useStreamMembers()

  useEffect(() => {
    if (!activeStreamID) {
      updateMeta({ streamID })
      joinStream(streamID)
      initListeners()
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
