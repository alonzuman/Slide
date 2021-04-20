import { Theme } from '@react-navigation/native'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from '../providers/ThemeProvider'

export const useTheme = () => {
  return useContext(ThemeContext) as Theme
}
