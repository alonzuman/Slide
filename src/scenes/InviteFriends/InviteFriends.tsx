import { useNavigation } from '@react-navigation/core'
import React, { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import HeaderLeft from '../../core/HeaderLeft'
import Typography from '../../core/Typography'

export default function InviteFriends() {
  const { setOptions } = useNavigation()

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => <HeaderLeft mode='modal' />,
      headerTitle: 'Invite friends',
      headerShown: true
    })
  }, [setOptions])

  return (
    <View>
      <Typography>Invite Friends</Typography>
    </View>
  )
}
