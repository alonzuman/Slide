import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { ClientRole } from 'react-native-agora'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { useStream } from '../../hooks/useStream'
import { useStreamProvider } from '../../hooks/useStreamProvider'
import { useUser } from '../../hooks/useUser'
import { speakerJoined, speakerLeft } from '../../slices/stream'
import StreamAudience from './StreamAudience'
import StreamControls from './StreamControls'

export default function StreamFooter() {
  const insets = useSafeAreaInsets()
  const { onStage } = useStream()
  const { user } = useUser()
  const isOnStage = onStage?.includes(user?._id)
  const { engine } = useStreamProvider()
  const dispatch = useDispatch()

  useEffect(() => {
    engine?.setClientRole(isOnStage ? ClientRole.Broadcaster : ClientRole.Audience)
    if (isOnStage) {
      engine?.enableAudio()
      engine?.enableVideo()
    }
    dispatch(isOnStage ? speakerJoined({ speakerID: user?.streamID }) : speakerLeft({ speakerID: user?.streamID }))
  }, [isOnStage])

  return (
    <View style={{ paddingBottom: insets.bottom || 12, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <StreamAudience />
      <StreamControls />
    </View>
  )
}
