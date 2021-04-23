import React, { useContext } from 'react'
import { SnackbarContext } from '../providers/SnackbarProvider'

type Context = {
  openSnackbar: Function
}

export default function useSnackbar() {
  return useContext(SnackbarContext) as Context
}
