import React, { useContext } from 'react'
import { ThemeContext } from '../providers/ThemeProvider'
import { Theme } from '../types'

export const useTheme = () => {
  return useContext(ThemeContext) as Theme
}
