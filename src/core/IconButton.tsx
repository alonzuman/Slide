import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import BlurWrapper from './BlurWrapper'

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
      activeOpacity={.8}
      style={{
        backgroundColor: card ? colors.cardAlt : 'transparent',
        height: sizes[size],
        width: sizes[size],
        borderRadius: sizes[size] / 2,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: card ? colors.border : 'transparent',
        justifyContent: 'center',
        shadowColor: "#00000055",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
        elevation: 5,
        ...style
      }}
      onPress={onPress}
    >
      <BlurWrapper
        style={{
          height: sizes[size],
          width: sizes[size],
          borderRadius: sizes[size] / 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </BlurWrapper>
    </TouchableOpacity>
  )
}
