import React, { createContext, useState } from 'react'

export const StreamMetaContext = createContext()

export default function StreamMetaProvider({ children }) {
  const [{ streamID, meta }, setMeta] = useState({
    streamID: '',
    meta: {
      name: '',
      description: '',
      imageURL: ''
    },
  })

  return (
    <StreamMetaContext.Provider value={{ streamID, meta, setMeta }}>
      {children}
    </StreamMetaContext.Provider>
  )
}
