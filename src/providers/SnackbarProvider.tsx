import React, { createContext, useState } from 'react'
import Snackbar from '../core/Snackbar'

export const SnackbarContext = createContext()

export default function SnackbarProvider({ children }: { children: any }) {
  const [{ primary, secondary, type }, setSnackbar] = useState({
    primary: '',
    secondary: '',
    type: ''
  })

  const openSnackbar = (args: { primary: string, secondary?: string, type: 'WARNING' | 'SUCCESS' | 'ERROR' }) => {
    setSnackbar(args)
  }

  const clearSnackbar = () => {
    setSnackbar({ primary: '', secondary: '', type: '' })
  }

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        primary={primary}
        secondary={secondary}
        type={type}
        clearSnackbar={clearSnackbar}
      />
    </SnackbarContext.Provider>
  )
}
