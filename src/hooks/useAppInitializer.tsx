import React, { useEffect } from 'react'
import { clearUser, fetchMyUser } from '../slices/user'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import { updateTheme } from '../slices/theme'
import Theme from '../constants/Theme'

export default function useAppInitializer() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTheme({
      type: 'dark',
      colors: Theme.colors.dark
    }))
  }, [])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(fetchMyUser())
      } else {
        dispatch(clearUser())
      }
    })

    return () => subscriber
  }, [])

  return null
}
