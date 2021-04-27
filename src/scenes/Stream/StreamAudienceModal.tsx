import React from 'react'
import { useStreamAudience } from '../../hooks/useStream'
import StreamMember from './StreamMember'

export default function StreamAudienceModal() {
  const audience = useStreamAudience()

  if (audience?.length === 0) return null;
  return (
    <>
      {audience?.map(audience => <StreamMember userID={audience?._id} key={audience?._id} />)}
    </>
  )
}
