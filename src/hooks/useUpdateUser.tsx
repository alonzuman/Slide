import React from 'react'
import { View, Text } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import API from '../API/API'

export default function useUpdateUser() {
  const queryClient = useQueryClient()
  const { mutate: updateUser, isLoading: isUpadting } = useMutation(API.Me.updateMyUser, {
    onSuccess: () => queryClient.invalidateQueries('user'),
  })

  return { updateUser, isUpadting }
}
