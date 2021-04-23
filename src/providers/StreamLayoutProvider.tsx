import React, { createContext, useState } from 'react'

export const StreamLayoutContext = createContext()

export default function StreamLayoutProvider({ children }: { children?: any }) {
  const [layout, setLayout] = useState({
    isZenMode: false,
    openModal: '',
  })

  const openModal = (modal: string) => setLayout({ ...layout, openModal: modal })
  const closeModal = () => setLayout({ ...layout, openModal: '' })
  const toggleZenMode = () => setLayout({ ...layout, isZenMode: !layout.isZenMode })

  return (
    <StreamLayoutContext.Provider value={{ layout, openModal, closeModal, setLayout, toggleZenMode }}>
      {children}
    </StreamLayoutContext.Provider>
  )
}
