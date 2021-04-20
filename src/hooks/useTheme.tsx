import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from '../providers/ThemeProvider'
import { Theme } from '../types'

export const useTheme = () => {
  return useContext(ThemeContext) as Theme
}
