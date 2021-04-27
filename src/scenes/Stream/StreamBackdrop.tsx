import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import DefaultButton from '../../core/DefaultButton'
import Typography from '../../core/Typography'
import useStream, { useStreamIsLive } from '../../hooks/useStream'

export default function StreamBackdrop() {
  const { goBack } = useNavigation()
  const isLive = useStreamIsLive()
  const { leaveStream } = useStream()

  const handlePress = async () => {
    await leaveStream()
    goBack()
  }

  if (isLive) return null;

  return (
    <View style={styles.container}>
      <Typography style={styles.title} variant='h3'>Stream ended</Typography>
      <Typography variant='body' color='secondary'>This stream was ended by its host</Typography>
      <DefaultButton onPress={handlePress} title='Leave stream' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099'
  },

  title: {
    marginBottom: 4,
    color: '#fff'
  }
})
