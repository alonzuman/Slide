import React, { useContext } from 'react'
import { ModalContext } from '../providers/ModalProvider'

type OpenModalArgs = {
  primary: string
  secondary: string
  type: string
  severity: string
  action: Function
}

type ModalArgs = {
  openModal: (any) => void
}

export default function useModal() {
  return useContext(ModalContext) as ModalArgs
}
