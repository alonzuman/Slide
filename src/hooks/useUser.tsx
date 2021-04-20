import React from 'react'
import { useQuery } from 'react-query'
import API from '../API/API'

export const useUser = () => {
  const { data: user, isLoading, refetch: refetchUser } = useQuery('user', API.Me.getMyUser)
  return { user, isLoading, refetchUser }
}
