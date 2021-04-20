import React from 'react'
import { View } from 'react-native'
import IconButton from '../../core/IconButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { useUser } from '../../hooks/useUser'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'
import Constants from '../../constants/Constants'
import useStreamLayout from '../../hooks/useStreamLayout'
import useStreamMembers from '../../hooks/useStreamMembers'

export default function StreamControls() {
  const { owners, onStage } = useStreamMembers()
  const { videoMuted, audioMuted, engine } = useStreamSpeakers()
  const { openModal } = useStreamLayout()
  const { user } = useUser()
  const iconProps = { size: 20, color: '#fff' }
  const isVideoMuted = videoMuted?.includes(user?.streamID)
  const isAudioMuted = audioMuted?.includes(user?.streamID)
  const currentRole = owners?.includes(user?._id) ? 'OWNER' : onStage?.includes(user?._id) ? 'SPEAKER' : 'AUDIENCE'

  const options = [
    {
      onPress: () => {
        if (isAudioMuted) {
          engine?.enableLocalAudio(true)
          engine?.muteLocalAudioStream(false)
        } else {
          engine?.enableLocalAudio(false)
          engine?.muteLocalAudioStream(true)
        }
      },
      icon: <MaterialCommunityIcons name={`microphone${isAudioMuted ? '-off' : ''}`} {...iconProps} />,
      label: 'mic',
      role: 'SPEAKER'
    },
    {
      onPress: () => {
        if (isVideoMuted) {
          engine?.enableLocalVideo(true)
          engine?.muteLocalVideoStream(false)
        } else {
          engine?.enableLocalVideo(false)
          engine?.muteLocalVideoStream(true)
        }
      },
      icon: <MaterialCommunityIcons name={`camera${isVideoMuted ? '-off' : ''}`} {...iconProps} />,
      label: 'cam',
      role: 'SPEAKER'
    },
    {
      onPress: () => engine?.switchCamera(),
      icon: <MaterialCommunityIcons name={'camera-retake'} {...iconProps} />,
      label: 'switch-cam',
      role: 'SPEAKER'
    },
    {
      onPress: () => openModal(Constants.StreamModals.INVITES),
      icon: <Feather name={'send'} {...iconProps} />,
      label: 'share',
      role: 'ANY'
    },
  ]

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {options?.map(({ onPress, role, icon, label }) => {
        if (role !== 'ANY' && currentRole !== 'OWNER' && role !== currentRole) return null;
        return (
          <IconButton key={label} onPress={onPress}>
            {icon}
          </IconButton>
        )
      })}
    </View>
  )
}
