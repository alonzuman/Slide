import React, { createContext, useState } from 'react'

export const StreamLayoutContext = createContext()

export default function StreamLayoutProvider({ children }) {
  const [layout, setLayout] = useState({
    openModal: '',
  })

  const openModal = (modal: string) => setLayout({ ...layout, openModal: modal })
  const closeModal = () => setLayout({ ...layout, openModal: '' })

  return (
    <StreamLayoutContext.Provider value={{ layout, openModal, closeModal, setLayout }}>
      {children}
    </StreamLayoutContext.Provider>
  )
}
