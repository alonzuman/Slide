import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import API from '../../API/API'
import Avatar from '../../core/Avatar'
import ListItem from '../../core/ListItem'
import { formatDistance } from 'date-fns'

export default function ProfileFollowing({ route, navigation }) {
  const { userID } = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState(false)

  const fetchUsers = async () => {
    const data = await API.Users.getUserFollowing(userID)
    setUsers(data);
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    fetchUsers()
  }, [])

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
              renderBefore={<Avatar uri={item?.avatar} size='m' />}
              primary={item?.name}
              secondary={`Joined ${formatDistance(Date.parse(item?.createdAt), Date.now())} ago`}
            />
          )}
        />
      )}
    </>
  )
}
