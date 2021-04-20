import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { useQueryClient } from 'react-query'
import { useUser } from './useUser'

export default function useAppInitializer() {
  const { refetchUser } = useUser()
  const queryClient = useQueryClient()

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        refetchUser()
      } else {
        queryClient.clear()
      }
    })

    return () => subscriber
  }, [])

  return null
}
