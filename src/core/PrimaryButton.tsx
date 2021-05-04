import React, { ReactElement, ReactNode } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme'
import Typography from './Typography';

type Props = {
  size?: 's' | 'm' | 'l',
  title?: string,
  style?: ViewStyle
  renderBefore?: ReactNode
  renderAfter?: ReactNode
  isLoading?: boolean
  onPress?: any
  disabled?: boolean
}

export default function PrimaryButton({ disabled = false, onPress, style, isLoading, renderBefore, renderAfter, size = 'm', title, ...rest }: Props) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={() => disabled ? null : onPress?.()}
      activeOpacity={.8}
      style={{
        height: size === 's' ? 32 : size === 'm' ? 48 : 64,
        borderColor: disabled ? colors.border : colors.secondaryDark,
        borderWidth: 1,
        backgroundColor: disabled ? colors.border : colors.primary,
        alignItems: 'center',
        borderRadius: 32,
        justifyContent: 'center',
        overflow: 'hidden',
        paddingHorizontal: 8,
        flexDirection: 'row',
        ...style
      }}
    >
      {colors?.primary && colors?.secondary && !disabled && (
        <LinearGradient
          style={{ ...StyleSheet.absoluteFillObject }}
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: .5 }}
          end={{ x: 1, y: 0 }}
        />
      )}
      {renderBefore}
      {isLoading ?
        <ActivityIndicator color='#fff' /> :
        <Typography variant='h3' style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>{title}</Typography>}
      {renderAfter}
    </TouchableOpacity >
  )
}
