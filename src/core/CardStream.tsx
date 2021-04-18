import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import Typography from './Typography'

const WIDTH = (Dimensions.get('window').width / 2) - 20
const HEIGHT = WIDTH * 1.5

export default function CardStream({ name, onPress, imageURI, audience, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.container, ...style }}>
      <Image source={{ uri: imageURI }} style={styles.image} />
      <Typography>{name}</Typography>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: HEIGHT,
    width: WIDTH,
    borderRadius: 7,
    overflow: 'hidden'
  },

  image: {
    ...StyleSheet.absoluteFillObject
  }
})
