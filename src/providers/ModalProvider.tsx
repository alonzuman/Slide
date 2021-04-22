import React, { createContext, useReducer } from 'react'
import Constants from '../constants/Constants'
import ModalConfirm from '../core/ModalConfirm'

export const ModalContext = createContext()

export default function ModalProvider({ children }) {
  const [{ title, body, type, action, severity, renderBefore }, dispatch] = useReducer(layoutReducer, initialState)

  const openModal = (args) => {
    dispatch({
      type: OPEN_MODAL,
      payload: { ...args }
    })
  }

  const closeModal = () => dispatch({ type: CLOSE_MODAL })

  const _renderModal = () => {
    const props = {
      type,
      title,
      body,
      renderBefore,
      action,
      severity
    }

    switch (type) {
      case Constants.Modals.CONFIRM: return <ModalConfirm {...props} isOpen={!!type} onClose={closeModal} />
      default: return null;
    }
  }

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {_renderModal()}
    </ModalContext.Provider>
  )
}

const initialState = {
  type: '',
  title: '',
  body: '',
  severity: '',
  action: null
}

const layoutReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case OPEN_MODAL: return payload;
    case CLOSE_MODAL: return initialState
  }
}

const OPEN_MODAL = 'MODAL/OPEN_MODAL'
const CLOSE_MODAL = 'MODAL/CLOSE_MODAL'
