import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import API from '../../API/API'
import Avatar from '../../core/Avatar'
import ListItem from '../../core/ListItem'
import { formatDistance } from 'date-fns'
import { useQuery } from 'react-query'
import useScreenOptions from '../../hooks/useScreenOptions'

export default function ProfileFollowing({ route, navigation }) {
  useScreenOptions()
  const { userID } = route.params
  const { data: users, isLoading } = useQuery(['user-following', userID], () => API.Users.getUserFollowing(userID))

  return (
    <>
      {isLoading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {!isLoading && (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
          data={users}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => navigation.push('User Profile', { userID: item?._id })}
              renderBefore={<Avatar uri={item?.avatar} size='s' />}
              primary={item?.name}
              secondary={`Joined ${formatDistance(Date.parse(item?.createdAt), Date.now())} ago`}
            />
          )}
        />
      )}
    </>
  )
}
