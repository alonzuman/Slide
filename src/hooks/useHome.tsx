import React from 'react'
import { useSelector } from 'react-redux'

export const useHome = () => {
  return useSelector(state => state.home)
}
