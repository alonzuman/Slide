import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import API from '../../API/API'
import Avatar from '../../core/Avatar'
import ListItem from '../../core/ListItem'
import { useUser } from '../../hooks/useUser'

export default function InviteModal() {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const { user } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await API.Users.getUserFollowing(user?._id)
      setUsers(data)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  console.log('invite')

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
