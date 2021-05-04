import React, { ReactElement } from 'react'
import { ActivityIndicator, TouchableOpacity, ViewStyle } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import Typography from './Typography';

type Props = {
  size?: 's' | 'm' | 'l',
  title?: string,
  style?: ViewStyle
  renderBefore?: ReactElement
  renderAfter?: ReactElement
  isLoading?: boolean
  onPress?: any
}

export default function SecondaryButton({ onPress, style, isLoading, renderBefore, renderAfter, size = 'm', title, ...rest }: Props) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={.8}
      style={{
        height: size === 's' ? 32 : size === 'm' ? 48 : 64,
        borderColor: colors.secondaryDark,
        borderWidth: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderRadius: 32,
        paddingHorizontal: 8,
        justifyContent: 'center',
        overflow: 'hidden',
        ...style
      }}
    >
      {renderBefore}
      {isLoading ?
        <ActivityIndicator color={colors.secondaryDark} /> :
        <Typography variant='h3' style={{ color: colors.secondaryDark, fontSize: 16, fontWeight: '600' }}>{title}</Typography>}
      {renderAfter}
    </TouchableOpacity >
  )
}
