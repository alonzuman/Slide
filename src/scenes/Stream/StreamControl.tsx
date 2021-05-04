import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'

export default function StreamControl({ onPress, children, style }: { onPress: Function, children: any, style?: ViewStyle }) {
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
