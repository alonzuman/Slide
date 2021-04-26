import React, { useContext } from 'react'
import RtcEngine from 'react-native-agora'
import { EngineContext } from '../providers/EngineProvider'

export default function useEngine() {
  return useContext(EngineContext) as RtcEngine | null
}
