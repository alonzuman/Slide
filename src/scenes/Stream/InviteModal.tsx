import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useQuery } from 'react-query'
import API from '../../API/API'
import Avatar from '../../core/Avatar'
import ListItem from '../../core/ListItem'
import { useUser } from '../../hooks/useUser'

export default function InviteModal() {
  const { user } = useUser()
  const { data: users, isLoading } = useQuery(['user-following', user?._id], () => API.Users.getUserFollowing(user?._id))

  return (
    <>
      {isLoading && <ActivityIndicator style={{ marginTop: 24 }} />}
      {!isLoading && users?.map(({ avatar, _id, name }) => (
        <ListItem
          key={_id}
          renderBefore={<Avatar size='m' uri={avatar} />}
          primary={name}
        />
      ))}
    </>
  )
}
