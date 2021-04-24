import React from 'react'
import { StyleSheet, View } from 'react-native'
import IconButton from '../../core/IconButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { useUser } from '../../hooks/useUser'
import Constants from '../../constants/Constants'
import useStreamLayout from '../../hooks/useStreamLayout'
import useStream from '../../hooks/useStream'
import Typography from '../../core/Typography'
import StreamControl from './StreamControl'

export default function StreamControls() {
  const {
    switchCamera,
    unMuteLocalVideo,
    unMuteLocalAudio,
    muteLocalAudio,
    muteLocalVideo,
    videoMuted,
    audioMuted,
    engine,
    owners,
    onStage,
    raiseHand,
    unraiseHand,
    raisedHands
  } = useStream()
  const { openModal } = useStreamLayout()
  const { user } = useUser()
  const iconProps = { size: 20, color: '#fff' }
  const isVideoMuted = videoMuted?.includes(user?.streamID)
  const isAudioMuted = audioMuted?.includes(user?.streamID)
  const isHandRaised = raisedHands?.includes(user?._id)
  const currentRole = owners?.includes(user?._id) ? 'OWNER' : onStage?.includes(user?._id) ? 'SPEAKER' : 'AUDIENCE'

  // TODO: move these to the engine provider
  const options = [
    {
      onPress: () => isAudioMuted ? unMuteLocalAudio() : muteLocalAudio(),
      icon: <MaterialCommunityIcons name={`microphone${isAudioMuted ? '-off' : ''}`} {...iconProps} />,
      label: 'mic',
      role: 'SPEAKER'
    },
    {
      onPress: () => isVideoMuted ? unMuteLocalVideo() : muteLocalVideo(),
      icon: <MaterialCommunityIcons name={`camera${isVideoMuted ? '-off' : ''}`} {...iconProps} />,
      label: 'cam',
      role: 'SPEAKER'
    },
    {
      onPress: () => switchCamera(),
      icon: <MaterialCommunityIcons name={'camera-retake'} {...iconProps} />,
      label: 'switch-cam',
      role: 'SPEAKER'
    },
    {
      onPress: () => !isHandRaised ? raiseHand() : unraiseHand(),
      icon: <Typography variant='h4'>🎙️</Typography>,
      label: 'raise-hand',
      role: 'AUDIENCE'
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
        if (role === currentRole) return (
          <StreamControl style={styles.iconButton} key={label} onPress={onPress}>
            {icon}
          </StreamControl>
        )

        if (currentRole === 'OWNER' && role !== 'AUDIENCE') return (
          <StreamControl style={styles.iconButton} key={label} onPress={onPress}>
            {icon}
          </StreamControl>
        )

        if (role === 'ANY') return (
          <StreamControl style={styles.iconButton} key={label} onPress={onPress}>
            {icon}
          </StreamControl>
        )

        return null;
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    marginLeft: 8
  }
})
