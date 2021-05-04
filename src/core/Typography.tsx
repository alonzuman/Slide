import React, { ReactElement } from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'
import { useTheme } from '../hooks/useTheme'

type Props = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'subtitle'
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
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  h3: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  h4: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '500'
  },
  h5: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    letterSpacing: .8,
    textTransform: 'uppercase'
  },
  body: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16
  },
  subtitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
  }
})
