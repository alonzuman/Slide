import React, { createContext, useEffect, useState } from 'react'
import Theme from '../constants/Theme'
import Splash from '../Splash'
import { Theme as ThemeType } from '../types'

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<ThemeType | null>(null)

  useEffect(() => {
    setTheme({
      type: 'dark',
      colors: Theme.colors.dark
    })
  }, [])


  if (!theme) return <Splash />

  return (
    <ThemeContext.Provider value={{ ...theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
