import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { useQueryClient } from 'react-query';
import { useUser } from './useUser';

export default function useAppInitializer() {
  const queryClient = useQueryClient()
  const { refetchUser } = useUser()
  const [isInitializing, setIsInitializing] = useState(true)

  // Get user state
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(res => {
      if (res) {
        refetchUser()
      } else {
        queryClient.clear()
      }
      setIsInitializing(false)
    })

    return () => subscriber()
  }, [])

  return { isInitializing }
}
