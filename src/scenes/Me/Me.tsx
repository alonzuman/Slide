import React, { useLayoutEffect } from 'react'
import { ScrollView, Button } from 'react-native'
import { useUser } from '../../hooks/useUser'
import auth from '@react-native-firebase/auth'
import Entypo from 'react-native-vector-icons/Entypo'
import Profile from '../Profile/Profile'
import IconButton from '../../core/IconButton'

export default function Me({ navigation }) {
  const { data: user } = useUser()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton size='m' style={{ marginRight: 12 }} onPress={() => navigation.push('Settings')}>
          <Entypo name='cog' size={24} color='#fff' />
        </IconButton>
      ),
      // headerTransparent: true,
      headerTitle: ''
    })
  }, [navigation])

  return (
    <ScrollView>
      <Profile
        avatar={user?.avatar}
        name={user?.name}
        bio={user?.bio}
        followers={user?.followers}
        following={user?.following}
        createdAt={user?.createdAt}
        _id={user?._id}
      />
    </ScrollView>
  )
}
