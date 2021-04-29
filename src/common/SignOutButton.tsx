import React from 'react'
import auth from '@react-native-firebase/auth'
import { useQueryClient } from 'react-query'
import DefaultButton from '../core/DefaultButton'
import useModal from '../hooks/useModal'
import Avatar from '../core/Avatar'
import { useUser } from '../hooks/useUser'
import Constants from '../constants/Constants'

export default function SignOutButton({ style }) {
  const { openModal } = useModal()
  const { user } = useUser()
  const queryClient = useQueryClient()

  const handleSignOutPress = () => {
    openModal({
      renderBefore: <Avatar size='l' uri={user?.avatar} style={{ marginTop: 12 }} />,
      body: 'Are you sure you wish to sign out?',
      type: Constants.Modals.SELECT,
      action: signOut,
      severity: 'error'
    })
  }

  const signOut = () => {
    queryClient.clear()
    auth().signOut()
  }

  return <DefaultButton style={style} title='Sign out' onPress={handleSignOutPress} />
}
