import React from 'react'
import { View } from 'react-native'
import DefaultButton from '../../core/DefaultButton'
import auth from '@react-native-firebase/auth'
import useModal from '../../hooks/useModal'
import Constants from '../../constants/Constants'
import Avatar from '../../core/Avatar'
import { useUser } from '../../hooks/useUser'
import useAuth from '../../hooks/useAuth'

export default function Settings() {
  const { signOut } = useAuth()
  const { openModal } = useModal()
  const { user } = useUser()

  const handleSignOutPress = () => {
    openModal({
      renderBefore: <Avatar size='l' uri={user?.avatar} style={{ marginBottom: 12 }} />,
      body: 'Are you sure you wish to sign out?',
      type: Constants.Modals.CONFIRM,
      action: signOut,
      severity: 'error'
    })
  }

  return (
    <View>
      <DefaultButton title='Sign out' onPress={handleSignOutPress} />
    </View>
  )
}
