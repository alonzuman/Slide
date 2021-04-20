import React, { ReactElement } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme'
import Typography from './Typography';

type Props = {
  size: 's' | 'm' | 'l',
  title: string,
  style: ViewStyle
  renderBefore: ReactElement
  renderAfter: ReactElement
  isLoading: boolean
}

export default function DefaultButton({ onPress, style, isLoading, renderBefore, renderAfter, size = 'm', title, ...rest }: Props) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={.8}
      style={{
        height: size === 's' ? 32 : size === 'm' ? 48 : 56,
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
        <Typography style={{ color: colors.secondaryDark, fontSize: 16, fontWeight: '600' }}>{title}</Typography>}
      {renderAfter}
    </TouchableOpacity >
  )
}
