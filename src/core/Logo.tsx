import React from 'react'
import { Image, ImageStyle } from 'react-native'
import Constants from '../constants/Constants'

export default function Logo({ style }: { style: ImageStyle }) {
  return (
    <Image
      style={{ marginLeft: 8, height: 32, width: 80, ...style }}
      source={{ uri: Constants.Images.Logos.White }}
    />
  )
}
