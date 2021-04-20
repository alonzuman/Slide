import React, { useContext } from 'react'
import { StreamMembersContext } from '../providers/StreamMembersProvider'

export default function useStreamMembers() {
  return useContext(StreamMembersContext)
}
