import React, { useLayoutEffect } from 'react'
import { useQuery } from 'react-query'
import API from '../../API/API'
import Profile from './Profile'

export default function UserProfile({ navigation, route }) {
  const { userID, isInStack } = route.params
  const { data: user, isLoading } = useQuery(['user', userID], () => API.Users.getUserByID(userID))

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,
    })
  }, [navigation, userID])

  return <Profile {...user} isInStack={isInStack} isMe={false} isLoading={isLoading} />
}
