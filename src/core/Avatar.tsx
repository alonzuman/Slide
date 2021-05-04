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
    xs: 18,
    s: 24,
    m: 32,
    l: 40,
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
          borderRadius: sizes[size] / 2.4,
          ...style
        }}
        source={{ uri: uri || Constants.Images.Avatar }}
      />
    </>
  )
}
