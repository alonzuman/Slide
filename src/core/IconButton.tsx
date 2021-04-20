import React from 'react'
import { TouchableOpacity } from 'react-native'

type Props = {
  size?: 'xs' | 's' | 'm' | 'l',
  children?: any,
  onPress?: Function
}

export default function IconButton({ size = 'm', children, onPress, style }: Props) {
  const sizes = {
    xs: 24,
    s: 32,
    m: 40,
    l: 56
  }

  return (
    <TouchableOpacity
      style={{
        height: sizes[size],
        width: sizes[size],
        borderRadius: sizes[size] / 2,
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}
