import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AvatarsGroup from '../../core/AvatarsGroup'
import DefaultButton from '../../core/DefaultButton'
import ListItem from '../../core/ListItem'
import Typography from '../../core/Typography'
import useStreamMembers from '../../hooks/useStreamMembers'
import useStreamMeta from '../../hooks/useStreamMeta'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'
import { useTheme } from '../../hooks/useTheme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconButton from '../../core/IconButton'

export default function StreamWidget() {
  const { leaveStream } = useStreamSpeakers()
  const { clearListeners, audience } = useStreamMembers()
  const { meta, streamID, setMeta } = useStreamMeta()
  const { colors } = useTheme()
  const { push } = useNavigation()

  if (!streamID) return null

  const handlePress = () => push('Stream', {
    screen: 'Stream',
    params: { streamID }
  })

  const handleLeave = () => {
    leaveStream()
    clearListeners()
    setMeta({})
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
          <Typography variant='subtitle' color='secondary'>{`You ${audience?.length > 1 ? `and ${audience?.length - 1} more` : ''}`}</Typography>
        </View>
      )}
      renderAfter={(
        <IconButton style={{ marginRight: 8 }} onPress={handleLeave}>
          <Ionicons name='ios-close-sharp' color={colors.text} size={24} />
        </IconButton>
      )}
    />
  )
}
