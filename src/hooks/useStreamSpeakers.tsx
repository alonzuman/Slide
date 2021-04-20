import { useContext } from 'react'
import { StreamSpeakersContext } from '../providers/StreamSpeakersProvider'

export default function useStreamSpeakers() {
  return useContext(StreamSpeakersContext)
}
