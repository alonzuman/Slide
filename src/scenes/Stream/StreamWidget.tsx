import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'
import AvatarsGroup from '../../core/AvatarsGroup'
import ListItem from '../../core/ListItem'
import Typography from '../../core/Typography'
import useStream, { useStreamAudience, useStreamID, useStreamMembers, useStreamMeta, useStreamOwners } from '../../hooks/useStream'
import { useTheme } from '../../hooks/useTheme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconButton from '../../core/IconButton'
import useModal from '../../hooks/useModal'
import { useUser } from '../../hooks/useUser'
import Constants from '../../constants/Constants'
import LiveIndicator from '../../core/LiveIndicator'

export default function StreamWidget() {
  const { leaveStream, endStream } = useStream()
  const { colors } = useTheme()
  const { push } = useNavigation()
  const { openModal } = useModal()
  const meta = useStreamMeta()
  const streamID = useStreamID()
  const audience = useStreamAudience()
  const members = useStreamMembers()
  const owners = useStreamOwners()
  const { user } = useUser()
  const [isLeaving, setIsLeaving] = useState(false)
  const isOwner = owners?.includes(user?._id)

  const handlePress = () => push('Stream', {
    screen: 'Stream',
    params: { streamID }
  })

  const handleLeavePress = () => {
    if (isOwner) {
      return openModal({
        renderBefore: <AvatarsGroup users={audience} size='m' style={{ marginTop: 12 }} />,
        body: 'By leaving, you are permenantly closing this stream',
        type: Constants.Modals.SELECT,
        severity: 'error',
        action: async () => {
          setIsLeaving(true)
          await endStream()
          await leaveStream()
          return setIsLeaving(false)
        }
      })
    }

    leaveStream()
  }

  if (!streamID) return null

  return (
    <ListItem
      style={{
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        backgroundColor: colors.background,
        shadowColor: colors.secondaryDark,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: .4,
        shadowRadius: 12,
      }}
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <LiveIndicator size='s' />
          <TouchableOpacity style={{ padding: 8 }} onPress={handleLeavePress}>
            {isLeaving ?
              <ActivityIndicator /> :
              <Ionicons name='ios-close-sharp' color={colors.text} size={24} />
            }
          </TouchableOpacity>
        </View>
      )}
    />
  )
}
