import { useNavigation } from '@react-navigation/core'
import React, { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import Header from '../../core/Header'
import HeaderLeft from '../../core/HeaderLeft'
import Typography from '../../core/Typography'
import { useUser } from '../../hooks/useUser'

export default function InviteFriends() {
  const { setOptions } = useNavigation()
  const { user } = useUser()

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => <HeaderLeft mode='modal' />,
      headerTitle: '',
      headerShown: true
    })
  }, [setOptions])

  return (
    <>
      <Header
        disableMarginTop
        title={`${user?.invites} invites remaining`}
        subtitle='Non eu laboris commodo voluptate cupidatat pariatur dolore ipsum.'
      />

    </>
  )
}
