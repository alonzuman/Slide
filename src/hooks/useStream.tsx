import React, { useContext } from 'react'
import { StreamMembersContext } from '../providers/StreamProvider'

export default function useStream() {
  return useContext(StreamMembersContext)
}
