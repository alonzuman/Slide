import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import API from '../API/API'

export const useUser = () => {
  const queryClient = useQueryClient()
  const { data: user, isLoading, refetch: refetchUser } = useQuery('user', API.Me.getMyUser)
  const { mutate: updateUser, isLoading: isUpdating } = useMutation(API.Me.updateMyUser, {
    onSuccess: () => queryClient.invalidateQueries('user'),
  })
  // TODO make an optimisticUpdateUser function

  return { user, isLoading, isUpdating, updateUser, refetchUser }
}
