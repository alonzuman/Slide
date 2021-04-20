import React, { useContext } from 'react'
import { StreamMetaContext } from '../providers/StreamMetaProvider'

export default function useStreamMeta() {
  return useContext(StreamMetaContext)
}
