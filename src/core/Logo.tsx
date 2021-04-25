import React from 'react'
import { Appearance, Image, ImageStyle } from 'react-native'
import Constants from '../constants/Constants'
import { useTheme } from '../hooks/useTheme'

export default function Logo({ style }: { style: ImageStyle }) {
  const currentTheme = Appearance.getColorScheme() || 'dark'

  return (
    <Image
      style={{ marginLeft: 8, height: 32, width: 80, ...style }}
      source={{ uri: Constants.Images.Logos[currentTheme === 'dark' ? 'White' : 'Black'] }}
    />
  )
}
