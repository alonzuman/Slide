import React from 'react'
import Slider, { SliderProps } from '@react-native-community/slider';
import { useTheme } from '../hooks/useTheme';

export default function (props: SliderProps) {
  const { colors } = useTheme()
  return (
    <Slider
      maximumTrackTintColor={colors.border}
      minimumTrackTintColor={colors.primary}
      {...props}
    />
  )
}
