import React from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import API from '../API/API'
import { User } from '../types'

export const useUser = () => {
  return useQuery('user', API.Me.getMyUser)
}
