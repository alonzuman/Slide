import React, { createContext, useEffect, useState } from 'react'
import { Appearance } from 'react-native'
import Theme from '../constants/Theme'
import Splash from '../Splash'
import { Theme as ThemeType } from '../types'

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  // const currentTheme = Appearance.getColorScheme() || 'dark'
  const [theme, setTheme] = useState<ThemeType | null>({
    type: 'dark',
    colors: Theme.colors.dark
  })

  // const handler = ({ colorScheme }: Appearance.AppearanceListener) => setTheme({
  //   type: colorScheme,
  //   colors: Theme.colors[colorScheme]
  // })

  // useEffect(() => {
    // Appearance.addChangeListener(handler)
    // return () => Appearance.removeChangeListener(handler)
  // }, [])


  if (!theme) return <Splash />

  return (
    <ThemeContext.Provider value={{ ...theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
