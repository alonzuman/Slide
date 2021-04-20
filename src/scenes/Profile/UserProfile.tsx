import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useQuery } from 'react-query'
import API from '../../API/API'
import Profile from './Profile'

export default function UserProfile({ navigation, route }) {
  const { userID } = route.params
  const { user, isLoading } = useQuery(['user', userID], () => API.Users.fetchUser(userID))

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  return (
    <>
      {isLoading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {!isLoading && !!user && (
        <Profile
          createdAt={user?.createdAt}
          _id={userID}
          interests={user?.interests}
          avatar={user?.avatar}
          name={user?.name}
          cover={user?.cover}
          following={user?.following}
          followers={user?.followers}
          invite={user?.invite}
          bio={user?.bio}
        />
      )}
    </>
  )
}
