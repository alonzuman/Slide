import React, { useContext } from 'react'
import { ExploreContext } from '../providers/ExploreProvider'

export default function useExplore() {
  return useContext(ExploreContext)
}
