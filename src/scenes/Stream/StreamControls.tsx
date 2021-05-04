import React from 'react'
import { StyleSheet, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useUser } from '../../hooks/useUser'
import Constants from '../../constants/Constants'
import useStream, { useStreamAudioMutedSpeaker, useStreamIsJoined, useStreamOnStage, useStreamOwners, useStreamRaisedHands, useStreamVideoMuted, useStreamVideoMutedSpeaker } from '../../hooks/useStream'
import Typography from '../../core/Typography'
import StreamControl from './StreamControl'
import { setOpenModal } from '../../slices/streamLayout'
import { useAppDispatch } from '../../store'
import useStreamLayout from '../../hooks/useStreamLayout'
import { useTheme } from '../../hooks/useTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function StreamControls() {
  const {
    switchCamera,
    unMuteLocalVideo,
    unMuteLocalAudio,
    muteLocalAudio,
    muteLocalVideo,
    raiseHand,
    unraiseHand,
  } = useStream()
  const { user } = useUser()
  // TODO: fix the rerenders and split all of the actions to different components
  const isJoined = useStreamIsJoined()
  const { setOpenModal } = useStreamLayout()
  const owners = useStreamOwners()
  const onStage = useStreamOnStage()
  const raisedHands = useStreamRaisedHands()
  const isAudioMuted = useStreamAudioMutedSpeaker(user?.streamID)
  const isVideoMuted = useStreamVideoMutedSpeaker(user?.streamID)
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  const isHandRaised = raisedHands?.includes(user?._id)
  const currentRole = owners?.includes(user?._id) ? 'OWNER' : onStage?.includes(user?._id) ? 'SPEAKER' : 'AUDIENCE'
  const iconProps = { size: 24, color: colors.text }

  console.log('re-rendered controls', user?.name)
  const options = [
    {
      onPress: () => setOpenModal(Constants.Modals.FILTERS),
      icon: <Ionicons name='md-color-filter-outline' {...iconProps} />,
      label: 'filters',
      role: 'SPEAKER'
    },
    // {
    //   onPress: () => setOpenModal(Constants.Modals.WIDGETS),
    //   icon: <MaterialCommunityIcons name='sticker-emoji' {...iconProps} />,
    //   label: 'widgets',
    //   role: 'SPEAKER'
    // },
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
      icon: <Ionicons name='hand-right' {...iconProps} style={{ transform: [{ rotate: '-8deg' }] }} />,
      label: 'raise-hand',
      role: 'AUDIENCE'
    },
    {
      onPress: () => setOpenModal(Constants.Modals.INVITES),
      icon: <Feather name={'send'} {...iconProps} />,
      label: 'share',
      role: 'ANY'
    },
  ]

  return (
    <View
      style={{
        paddingTop: 8,
        paddingBottom: insets.bottom || 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      {isJoined && options?.map(({ onPress, role, icon, label }) => {
        if (role === currentRole) return (
          <StreamControl key={label} onPress={onPress}>
            {icon}
          </StreamControl>
        )

        if (currentRole === 'OWNER' && role !== 'AUDIENCE') return (
          <StreamControl key={label} onPress={onPress}>
            {icon}
          </StreamControl>
        )

        if (role === 'ANY') return (
          <StreamControl key={label} onPress={onPress}>
            {icon}
          </StreamControl>
        )

        return null;
      })}
    </View>
  )
}
