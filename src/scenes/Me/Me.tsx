import React, { useLayoutEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import Entypo from 'react-native-vector-icons/Entypo'
import Profile from '../Profile/Profile'
import IconButton from '../../core/IconButton'

export default function Me({ navigation }) {
  const { user } = useUser()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton size='m' style={{ marginRight: 12 }} onPress={() => navigation.push('Settings')}>
          <Entypo name='cog' size={24} color='#fff' />
        </IconButton>
      ),
      headerTransparent: true,
      headerTitle: ''
    })
  }, [navigation])

  return <Profile {...user} isMe />
}
