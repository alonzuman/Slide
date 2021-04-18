import React from 'react'
import { useSelector } from 'react-redux'
import { Stream } from '../types'

export const useStream = () => {
  return useSelector(state => state.stream) as Stream
}
