import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import { updateTheme } from '../slices/theme'
import Theme from '../constants/Theme'
import { useQuery, useQueryClient } from 'react-query'
import API from '../API/API'

export default function useAppInitializer() {
  const { refetch } = useQuery('user', API.Me.getMyUser)
  const queryClient = useQueryClient()

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        refetch()
      } else {
        queryClient.clear()
      }
    })

    return () => subscriber
  }, [])

  return null
}
