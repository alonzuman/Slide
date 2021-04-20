import { useContext } from 'react'
import RtcEngine from 'react-native-agora'
import { StreamSpeakersContext } from '../providers/StreamSpeakersProvider'

export default function useStreamSpeakers() {
  return useContext(StreamSpeakersContext) as { engine: RtcEngine }
}
