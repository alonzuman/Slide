import React, { useContext } from 'react'
import { SnackbarContext } from '../providers/SnackbarProvider'

export default function useSnackbar() {
  return useContext(SnackbarContext)
}
