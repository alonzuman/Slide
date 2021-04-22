import React, { createContext, useState } from 'react'

export const StreamMetaContext = createContext()

export default function StreamMetaProvider({ children }) {
  const [{ streamID, meta, isLive }, setMeta] = useState({
    streamID: '',
    isLive: true,
    meta: {
      name: '',
      description: '',
      imageURL: ''
    },
  })

  const updateMeta = (updatedFields) => {
    setMeta({ ...meta, ...updatedFields })
  }

  return (
    <StreamMetaContext.Provider value={{ isLive, streamID, meta, setMeta, updateMeta }}>
      {children}
    </StreamMetaContext.Provider>
  )
}
