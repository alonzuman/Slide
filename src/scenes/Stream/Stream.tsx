import React, { useEffect } from 'react'
import KeepAwake from 'react-native-keep-awake'
import useStream, { useStreamID } from '../../hooks/useStream';
import StreamBackdrop from './StreamBackdrop';
import StreamControls from './StreamControls';
import StreamHeader from './StreamHeader';
import StreamModals from './StreamModals';
import StreamOverlay from './StreamOverlay';

export default function Stream({ route }) {
  const { streamID } = route.params;
  const { switchStream, joinStream } = useStream()
  const activeStreamID = useStreamID()

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

  // console.log('re-rendered stream', Date.now())
  return (
    <>
      <KeepAwake />
      <StreamHeader />
      <StreamBackdrop />
      {/* <StreamState /> */}
      <StreamOverlay />
      <StreamControls />
      <StreamModals />
    </>
  )
}
