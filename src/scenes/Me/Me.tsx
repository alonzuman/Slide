import React from 'react'
import { useUser } from '../../hooks/useUser'
import Entypo from 'react-native-vector-icons/Entypo'
import Profile from '../Profile/Profile'
import IconButton from '../../core/IconButton'
import useScreenOptions from '../../hooks/useScreenOptions'
import { useTheme } from '../../hooks/useTheme'

export default function Me({ navigation }) {
  const { colors } = useTheme()
  const { user } = useUser()
  useScreenOptions({
    headerRight: () => (
      <IconButton elevation={1} size='m' style={{ marginRight: 12 }} onPress={() => navigation.push('Settings')}>
        <Entypo name='cog' size={24} color={colors.text} />
      </IconButton>
    ),
    headerTransparent: true,
    headerTitle: ''
  })

  return <Profile {...user} isMe />
}
