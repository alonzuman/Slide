import React, { ReactElement } from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'
import { useTheme } from '../hooks/useTheme'

type Props = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'subtitle'
  style?: TextStyle
  children?: ReactElement | any
  color?: 'secondary' | 'primary' | 'error' | ''
  numberOfLines?: number
  ellipsizeMode?: 'tail' | ''
}

export default function Typography({ variant = 'body', style, children, color = '', numberOfLines, ellipsizeMode = '' }: Props) {
  const { colors } = useTheme()

  return (
    <Text
      style={{
        ...styles[variant],
        color: !color ? colors.text : color === 'primary' ? colors.primary : color === 'error' ? colors.error : colors.textAlt,
        ...style
      }}
      ellipsizeMode='tail'
      numberOfLines={numberOfLines}
      children={children}
    />
  )
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '700'
  },
  h2: {
    fontSize: 24,
    fontWeight: '700'
  },
  h3: {
    fontSize: 18,
    fontWeight: '700'
  },
  h4: {
    fontSize: 16,
    fontWeight: '500'
  },
  h5: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: .5,
    textTransform: 'uppercase'
  },
  h6: {
    fontSize: 12,
    fontWeight: '400',
  },
  body: {
    fontSize: 16
  },
  subtitle: {
    fontSize: 14,
  }
})
