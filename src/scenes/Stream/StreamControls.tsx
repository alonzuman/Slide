import React from 'react'
import { View } from 'react-native'
import IconButton from '../../core/IconButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { useStreamProvider } from '../../hooks/useStreamProvider'
import { useUser } from '../../hooks/useUser'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'
import Constants from '../../constants/Constants'
import useStreamLayout from '../../hooks/useStreamLayout'

export default function StreamControls() {
  const { engine } = useStreamProvider()
  const { videoMuted, audioMuted } = useStreamSpeakers()
  const { openModal } = useStreamLayout()
  const { user } = useUser()
  const iconProps = { size: 20, color: '#fff' }
  const isVideoMuted = videoMuted?.includes(user?.streamID)
  const isAudioMuted = audioMuted?.includes(user?.streamID)

  const options = [
    {
      onPress: () => {
        if (isAudioMuted) {
          engine?.enableAudio()
          engine?.enableLocalAudio(true)
        } else {
          engine?.enableLocalAudio(false)
        }
      },
      icon: <MaterialCommunityIcons name={`microphone${isAudioMuted ? '-off' : ''}`} {...iconProps} />,
      label: 'mic'
    },
    {
      onPress: () => {
        if (isVideoMuted) {
          engine?.enableVideo()
          engine?.enableLocalVideo(true)
        } else {
          engine?.enableLocalVideo(false)
        }
      },
      icon: <MaterialCommunityIcons name={`camera${isVideoMuted ? '-off' : ''}`} {...iconProps} />,
      label: 'cam'
    },
    {
      onPress: () => engine?.switchCamera(),
      icon: <MaterialCommunityIcons name={'camera-retake'} {...iconProps} />,
      label: 'switch-cam'
    },
    {
      onPress: () => openModal(Constants.StreamModals.INVITES),
      icon: <Feather name={'send'} {...iconProps} />,
      label: 'share'
    },

  ]

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {options?.map(({ onPress, icon, label }) => (
        <IconButton key={label} onPress={onPress}>
          {icon}
        </IconButton>
      ))}
    </View>
  )
}
