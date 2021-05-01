import React, { useContext } from 'react'
import { ModalContext } from '../providers/ModalProvider'
import { ModalTypes } from '../types'

type ModalArgs = {
  closeModal: () => void
  openModal: ({
    title,
    body,
    type,
    severity,
    action,
    renderBefore,
    renderAfter
  }: {
    title?: string,
    body?: string,
    type: ModalTypes,
    severity?: string,
    action?: Function,
    renderBefore?: any,
    renderAfter?: any,
  }) => void
}

export default function useModal() {
  return useContext(ModalContext) as ModalArgs
}
