import React, { useEffect } from 'react'
import KeepAwake from 'react-native-keep-awake'
import useStream from '../../hooks/useStream';
import useStreamSpeakers from '../../hooks/useStreamSpeakers';
import StreamActiveSpeaker from './StreamActiveSpeaker';
import StreamFooter from './StreamFooter';
import StreamHeader from './StreamHeader';
import StreamModals from './StreamModals';
import StreamOverlay from './StreamOverlay';
import StreamState from './StreamState';

export default function Stream({ route }) {
  const { streamID } = route.params;
  const { streamID: activeStreamID } = useStream()
  const { joinStream } = useStreamSpeakers()

  useEffect(() => {
    if (!activeStreamID) {
      joinStream(streamID)
    }
  }, [])

  return (
    <>
      <KeepAwake />
      <StreamHeader />
      {/* <StreamState /> */}
      <StreamActiveSpeaker />
      <StreamOverlay />
      <StreamFooter />
      <StreamModals />
    </>
  )
}
