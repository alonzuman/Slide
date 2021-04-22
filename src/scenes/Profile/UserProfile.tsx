import React, { useLayoutEffect } from 'react'
import { useQuery } from 'react-query'
import API from '../../API/API'
import HeaderLeft from '../../core/HeaderLeft'
import Profile from './Profile'

export default function UserProfile({ navigation, route }) {
  const { userID } = route.params
  const { data: user, isLoading } = useQuery(['user', userID], () => API.Users.fetchUser(userID))

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <HeaderLeft />,
      headerTransparent: true,
    })
  }, [navigation, userID])

  return <Profile {...user} isMe={false} isLoading={isLoading} />
}
