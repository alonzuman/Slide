import React, { useEffect } from 'react'
import { useStreamProvider } from '../../hooks/useStreamProvider';
import StreamFooter from './StreamFooter';
import StreamOverlay from './StreamOverlay';

export default function Stream({ route }) {
  const { streamID } = route.params;
  const { engine, socket } = useStreamProvider()
  console.log(engine, socket)

  useEffect(() => {
    // Join as Audience
  }, [])

  return (
    <>
      {/* <Typography variant='h2'>{streamID}</Typography> */}
      <StreamOverlay />
      <StreamFooter />
    </>
  )
}
