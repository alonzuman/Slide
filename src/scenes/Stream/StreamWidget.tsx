import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View } from 'react-native'
import AvatarsGroup from '../../core/AvatarsGroup'
import ListItem from '../../core/ListItem'
import Typography from '../../core/Typography'
import useStreamMembers from '../../hooks/useStreamMembers'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'
import { useTheme } from '../../hooks/useTheme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconButton from '../../core/IconButton'
import useModal from '../../hooks/useModal'
import { useUser } from '../../hooks/useUser'
import Constants from '../../constants/Constants'

export default function StreamWidget() {
  const { leaveStream } = useStreamSpeakers()
  const { meta, streamID, clearListeners, audience, members, owners, endStream } = useStreamMembers()
  const { colors } = useTheme()
  const { push } = useNavigation()
  const { openModal } = useModal()
  const { user } = useUser()
  const isOwner = owners?.includes(user?._id)

  if (!streamID) return null

  const handlePress = () => push('Stream', {
    screen: 'Stream',
    params: { streamID }
  })

  const handleLeavePress = () => {
    if (isOwner) {
      return openModal({
        renderBefore: <AvatarsGroup users={audience} size='m' style={{ marginBottom: 12 }} />,
        body: 'By leaving, you are permenantly closing this stream',
        type: Constants.Modals.CONFIRM,
        severity: 'error',
        action: async () => {
          endStream()
          handleLeave()
        }
      })
    }

    handleLeave()
  }

  const handleLeave = () => {
    leaveStream()
    clearListeners()
  }

  return (
    <ListItem
      style={{ borderTopWidth: 1, borderTopColor: colors.border }}
      onPress={handlePress}
      renderPrimary={(
        <Typography variant='h4'>{meta?.name}</Typography>
      )}
      renderLabel={(
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AvatarsGroup
            style={{ marginRight: 4 }}
            showMore={false}
            onPress={handlePress}
            users={audience}
            size='xs'
            borderColor={colors.border}
          />
          {members?.length > 1 && <Typography variant='subtitle' color='secondary'>{`You and ${members?.length - 1} more`}</Typography>}
        </View>
      )}
      renderAfter={(
        <IconButton onPress={handleLeavePress}>
          <Ionicons name='ios-close-sharp' color={colors.text} size={24} />
        </IconButton>
      )}
    />
  )
}
