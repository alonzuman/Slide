import React from 'react'
import { View, Text, Image } from 'react-native'

type Props = {
  uri?: string,
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
}

export default function Avatar({ uri, size = 'm', style }: Props) {
  const sizes = {
    xs: 12,
    s: 24,
    m: 32,
    l: 40,
    xl: 56,
    xxl: 112,
    xxxl: 144
  }

  return (
    <Image
      style={{
        height: sizes[size],
        width: sizes[size],
        borderRadius: sizes[size] / 2,
        ...style
      }}
      source={{ uri }}
    />
  )
}
