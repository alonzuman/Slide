import React, { useContext } from 'react'
import { InvitesContext } from '../providers/InvitesProvider'

export default function useInvites() {
  return useContext(InvitesContext)
}
