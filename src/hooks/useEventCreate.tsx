import React, { useContext } from 'react'
import { EventCreateContext } from '../providers/EventCreateProvider'

export default function useEventCreate() {
  return useContext(EventCreateContext)
}
