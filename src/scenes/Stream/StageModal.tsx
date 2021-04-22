import React from 'react'
import { View, Text } from 'react-native'
import Avatar from '../../core/Avatar'
import ListItem from '../../core/ListItem'
import useStreamMembers from '../../hooks/useStreamMembers'
import useStreamSpeakers from '../../hooks/useStreamSpeakers'
import { useUser } from '../../hooks/useUser'
import ProfileFollowButton from '../Profile/ProfileFollowButton'

export default function StageModal() {
  const { speakers } = useStreamSpeakers()
  const { owners } = useStreamMembers()
  const { user } = useUser()

  return (
    <View>
      {speakers?.map(({ avatar, name, _id }) => {
        const isOwner = owners?.includes(_id)
        const isMe = _id === user?._id

        return (
          <ListItem
            key={_id}
            renderBefore={<Avatar uri={avatar} size='m' />}
            label={isOwner ? 'Host' : 'Speaker'}
            primary={name}
            renderAfter={isMe ? null : <ProfileFollowButton userID={_id} name={name} avatar={avatar} />}
          />
        )
      })}
    </View>
  )
}
