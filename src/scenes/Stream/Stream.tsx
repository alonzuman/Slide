import React, { useEffect } from 'react'
import KeepAwake from 'react-native-keep-awake'
import { useSelector } from 'react-redux';
import useStream from '../../hooks/useStream';
import StreamActiveSpeaker from './StreamActiveSpeaker';
import StreamBackdrop from './StreamBackdrop';
import StreamFooter from './StreamFooter';
import StreamHeader from './StreamHeader';
import StreamModals from './StreamModals';
import StreamOverlay from './StreamOverlay';
import StreamState from './StreamState';

export default function Stream({ route }) {
  const { streamID } = route.params;
  const { switchStream, joinStream, streamID: activeStreamID } = useStream()

  useEffect(() => {
    // If user is already in a stream and now is moving to a new stream
    if (activeStreamID && activeStreamID !== streamID) {
      switchStream(streamID)
    }

    // If user is not actively in a stream, and joining a new stream
    if (!activeStreamID && streamID) {
      joinStream(streamID)
    }

    // if user opens the stream he is already in
  }, [])

  return (
    <>
      <KeepAwake />
      <StreamHeader />
      <StreamBackdrop />
      {/* <StreamState /> */}
      <StreamActiveSpeaker />
      <StreamOverlay />
      <StreamFooter />
      <StreamModals />
    </>
  )
}
