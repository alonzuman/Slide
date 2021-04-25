import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Dimensions, View } from 'react-native'
import AvatarsGroup from './AvatarsGroup'
import Typography from './Typography'

const WIDTH = (Dimensions.get('window').width / 2) - 20
const HEIGHT = WIDTH * 1.5

export default function CardStream({ name, onPress, imageURL, members, style }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={.8} style={{ ...styles.container, ...style }}>
      <Image source={{ uri: imageURL }} style={styles.image} />
      <AvatarsGroup style={styles.avatars} users={members} max={2} borderColor='#fff' />
      <View style={styles.overlay} />
      <Typography style={styles.name} variant='h3'>{name}</Typography>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: HEIGHT,
    width: WIDTH,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 8
  },

  avatars: {
    alignSelf: 'flex-end'
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000020'
  },

  image: {
    ...StyleSheet.absoluteFillObject
  },

  name: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: '#fff'
  }
})
