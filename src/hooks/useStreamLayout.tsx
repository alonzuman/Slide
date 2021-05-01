import React from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { closeModal as _closeModal, setOpenModal as _setOpenModal, toggleZenMode as _toggleZenMode } from '../slices/streamLayout'
import { ModalTypes } from '../types'

export default function useStreamLayout() {
  const state = useAppSelector(state => state.streamLayout)
  const dispatch = useAppDispatch()

  const setOpenModal = (modal: ModalTypes) => dispatch(_setOpenModal(modal))
  const closeModal = () => dispatch(closeModal)
  const toggleZenMode = () => dispatch(_toggleZenMode())

  return { ...state, setOpenModal, closeModal, toggleZenMode }
}
