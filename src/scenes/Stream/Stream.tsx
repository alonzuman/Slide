import React, { useEffect } from 'react'
import KeepAwake from 'react-native-keep-awake'
import useStream from '../../hooks/useStream';
import StreamActiveSpeaker from './StreamActiveSpeaker';
import StreamFooter from './StreamFooter';
import StreamHeader from './StreamHeader';
import StreamModals from './StreamModals';
import StreamOverlay from './StreamOverlay';
import StreamState from './StreamState';

export default function Stream({ route }) {
  const { streamID } = route.params;
  const { streamID: activeStreamID, joinStream } = useStream()

  useEffect(() => {
    if (!activeStreamID) {
      joinStream(streamID)
    }
  }, [])

  return (
    <>
      <KeepAwake />
      <StreamHeader />
      <StreamActiveSpeaker />
      <StreamOverlay />
      {/* <StreamState /> */}
      <StreamFooter />
      <StreamModals />
    </>
  )
}
