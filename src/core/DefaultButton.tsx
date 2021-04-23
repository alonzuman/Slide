import React, { ReactElement } from 'react'
import { ActivityIndicator, GestureResponderEvent, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import Typography from './Typography';

type Props = {
  size?: 's' | 'm' | 'l'
  title: string,
  style?: ViewStyle
  renderBefore?: ReactElement
  renderAfter?: ReactElement
  isLoading?: boolean
  labelStyle?: ViewStyle
  onPress: (event: GestureResponderEvent) => void
}

export default function DefaultButton({ onPress, labelStyle, style, isLoading, renderBefore, renderAfter, size = 'm', title }: Props) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={.8}
      style={{
        height: size === 's' ? 32 : size === 'm' ? 48 : 64,
        borderColor: 'transparent',
        borderWidth: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 8,
        justifyContent: 'center',
        overflow: 'hidden',
        ...style
      }}
    >
      {renderBefore}
      {isLoading ?
        <ActivityIndicator color={colors.secondaryDark} /> :
        <Typography
          style={{
            color: colors.secondaryDark,
            fontSize: size === 'l' ? 18 : 16,
            fontWeight: '600',
            ...labelStyle
          }}
        >
          {title}
        </Typography>}
      {renderAfter}
    </TouchableOpacity >
  )
}
