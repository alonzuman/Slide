import React from 'react'
import { View, Text } from 'react-native'
import IconButton from '../../core/IconButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { streamUpdated } from '../../slices/stream'
import { useDispatch } from 'react-redux'
import { useStreamProvider } from '../../hooks/useStreamProvider'
import { useUser } from '../../hooks/useUser'
import { useStream } from '../../hooks/useStream'

export default function StreamControls() {
  const dispatch = useDispatch()
  const { videoMuted } = useStream()
  const { engine } = useStreamProvider()
  const { data: user } = useUser()
  const iconProps = { size: 20, color: '#fff' }
  const isVideoMuted = videoMuted?.includes(user?.streamID)

  const options = [
    {
      onPress: () => console.log('camera'),
      // icon: <MaterialCommunityIcons name={isMuted ? 'microphone-off' : 'microphone'} {...iconProps} />
      icon: <MaterialCommunityIcons name={'microphone-off'} {...iconProps} />,
      label: 'mic'
    },
    {
      onPress: () => engine?.muteLocalVideoStream(!isVideoMuted),
      // icon: <MaterialCommunityIcons name={isMuted ? 'microphone-off' : 'microphone'} {...iconProps} />
      // icon: <MaterialCommunityIcons name={isMuted ? 'camera-off' : 'camera'} {...iconProps} />,
      icon: <MaterialCommunityIcons name={'camera-off'} {...iconProps} />,
      label: 'cam'
    },
    {
      onPress: () => engine?.switchCamera(),
      // icon: <MaterialCommunityIcons name={isMuted ? 'microphone-off' : 'microphone'} {...iconProps} />
      icon: <MaterialCommunityIcons name={'camera-retake'} {...iconProps} />,
      label: 'switch-cam'
    },
    {
      onPress: () => dispatch(streamUpdated({ openModal: 'INVITE' })),
      // icon: <MaterialCommunityIcons name={isMuted ? 'microphone-off' : 'microphone'} {...iconProps} />
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
