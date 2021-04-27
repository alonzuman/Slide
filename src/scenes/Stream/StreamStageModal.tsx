import React from 'react'
import { useStreamSpeakers } from '../../hooks/useStream'
import StreamMember from './StreamMember'

export default function StageModal() {
  const speakers = useStreamSpeakers()

  return (
    <>
      {speakers?.map(({ _id }) => <StreamMember userID={_id} key={_id} />)}
    </>
  )
}
