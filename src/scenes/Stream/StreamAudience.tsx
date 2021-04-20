import React from 'react'
import Constants from '../../constants/Constants'
import AvatarsGroup from '../../core/AvatarsGroup'
import useStreamLayout from '../../hooks/useStreamLayout'
import useStreamMembers from '../../hooks/useStreamMembers'

export default function StreamAudience() {
  const { audience } = useStreamMembers()
  const { openModal } = useStreamLayout()

  return (
    <AvatarsGroup
      onPress={() => openModal(Constants.StreamModals.AUDIENCE)}
      users={audience}
      max={2}
      borderColor='#fff'
    />
  )
}
