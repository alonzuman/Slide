import React from 'react'
import { Image, ImageStyle } from 'react-native'
import Constants from '../constants/Constants'

type Props = {
  uri?: string,
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl',
  style?: ImageStyle
}

export default function Avatar({ uri, size = 'm', style }: Props) {
  const sizes = {
    xxs: 16,
    xs: 24,
    s: 32,
    m: 40,
    l: 48,
    xl: 80,
    xxl: 112,
    xxxl: 200
  }

  return (
    <>
      <Image
        style={{
          height: sizes[size],
          width: sizes[size],
          borderRadius: sizes[size] / Constants.Theme.shape.AVATAR_DIVIDER,
          ...style
        }}
        source={{ uri: uri || Constants.Images.Avatar }}
      />
    </>
  )
}
