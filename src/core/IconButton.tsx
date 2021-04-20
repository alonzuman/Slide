import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from '../hooks/useTheme'

type Props = {
  size?: 'xs' | 's' | 'm' | 'l',
  children?: any,
  onPress?: Function
  card?: boolean
}

export default function IconButton({ card = false, size = 'm', children, onPress, style }: Props) {
  const { colors } = useTheme()
  const sizes = {
    xs: 24,
    s: 32,
    m: 40,
    l: 56
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: card ? colors.cardAlt : 'transparent',
        height: sizes[size],
        width: sizes[size],
        borderRadius: sizes[size] / 2,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: card ? colors.border : 'transparent',
        justifyContent: 'center',
        ...style
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}
