import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function StreamControl({ onPress, children, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {children}
    </TouchableOpacity>
  )
}
