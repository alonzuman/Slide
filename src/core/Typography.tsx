import React, { ReactElement } from 'react'
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native'
import Constants from '../constants/Constants'
import { useTheme } from '../hooks/useTheme'

type Props = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'subtitle'
  style?: TextStyle
  children?: ReactElement | any
  color?: 'secondary' | 'primary' | 'error' | ''
  numberOfLines?: number
  ellipsizeMode?: 'tail' | ''
}

export default function Typography({ variant = 'body', style, children, color = '', numberOfLines, ...rest }: Props & TextProps) {
  const { colors } = useTheme()

  const textColor = ()=> {
    switch (color) {
      case 'secondary': return colors.textAlt;
      case 'primary': return colors.secondaryDark;
      case 'error': return colors.error
      default: return colors.text
    }
  }

  return (
    <Text
      style={{
        ...styles[variant],
        color: textColor(),
        ...style
      }}
      numberOfLines={numberOfLines}
      children={children}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  h1: {
    fontWeight: "700",
    // fontFamily: Constants.Fonts.h1,
    fontSize: 32,
  },
  h2: {
    fontWeight: "700",
    // fontFamily: Constants.Fonts.h2,
    fontSize: 24,
  },
  h3: {
    fontWeight: "700",
    // fontFamily: Constants.Fonts.h3,
    fontSize: 18,
  },
  h4: {
    fontWeight: '500',
    // fontFamily: Constants.Fonts.h4,
    fontSize: 16,
  },
  h5: {
    // fontFamily: Constants.Fonts.h5,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  body: {
    // fontFamily: Constants.Fonts.body,
    fontSize: 16,
  },
  subtitle: {
    // fontFamily: Constants.Fonts.body,
    fontSize: 14,
  },
});
