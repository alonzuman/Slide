import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from '../hooks/useTheme'
import Typography from './Typography'

type Props = {
  label: string,
  onPress?: Function | null
  style?: ViewStyle
  size?: 's' | 'm'
  isSelected?: boolean
}

export default function Chip({ size = 's', onPress, isSelected = false, label, style }: Props) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        borderColor: isSelected ? colors.primary : colors.border,
        padding: size === 's' ? 8 : 12,
        borderRadius: size === 's' ? 8 : 12,
        ...style
      }}
      onPress={onPress}
      activeOpacity={.8}
    >
      <Typography
        variant='subtitle'
        color={isSelected ? '' : 'secondary'}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1
  }
})
