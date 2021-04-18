import React from 'react'
import { useSelector } from 'react-redux'
import { User } from '../types'

export const useUser = () => {
  return useSelector(state => state.user as User)
}
