import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { StreamLayoutContext } from '../providers/StreamLayoutProvider'
import { StreamLayout } from '../types'

export default function useStreamLayout() {
  return useContext(StreamLayoutContext) as StreamLayout
}
