import React from 'react'
import Constants from '../../constants/Constants'
import AvatarsGroup from '../../core/AvatarsGroup'
import useStreamLayout from '../../hooks/useStreamLayout'
import useStreamMembers from '../../hooks/useStreamMembers'
import { useTheme } from '../../hooks/useTheme'

export default function StreamAudience() {
  const { audience } = useStreamMembers()
  const { openModal } = useStreamLayout()
  const { colors } = useTheme()

  return (
    <AvatarsGroup
      onPress={() => openModal(Constants.StreamModals.AUDIENCE)}
      users={audience}
      max={2}
      borderColor={colors.border}
    />
  )
}
