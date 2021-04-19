import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import AvatarsGroup from './AvatarsGroup'
import Typography from './Typography'

const WIDTH = (Dimensions.get('window').width / 2) - 20
const HEIGHT = WIDTH * 1.5

export default function CardStream({ name, onPress, imageURL, members, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.container, ...style }}>
      <Image source={{ uri: imageURL }} style={styles.image} />
      <Typography>{name}</Typography>
      <AvatarsGroup users={members} max={2} borderColor='#fff' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: HEIGHT,
    width: WIDTH,
    borderRadius: 8,
    overflow: 'hidden'
  },

  image: {
    ...StyleSheet.absoluteFillObject
  }
})
