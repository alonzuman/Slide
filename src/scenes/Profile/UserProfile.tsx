import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import API from '../../API/API'
import { UserProfile as ProfileType } from '../../types'
import Profile from './Profile'

export default function UserProfile({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<ProfileType | null>(null)
  const { userID } = route.params

  useEffect(() => {
    fetchUser()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  const fetchUser = async () => {
    setIsLoading(true)
    const data = await API.Users.fetchUser(userID)
    setUser(data);
    setIsLoading(false)
  }

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
