import React, { createContext, useEffect, useState } from 'react'
import { Appearance } from 'react-native'
import Theme from '../constants/Theme'
import Splash from '../Splash'
import { Theme as ThemeType } from '../types'

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<ThemeType | null>(null)
  const currentTheme = Appearance.getColorScheme() || 'dark'

  useEffect(() => {
    setTheme({
      type: currentTheme,
      colors: Theme.colors[currentTheme]
    })
  }, [currentTheme])


  if (!theme) return <Splash />

  return (
    <ThemeContext.Provider value={{ ...theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
