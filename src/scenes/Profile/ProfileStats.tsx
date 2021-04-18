import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Typography from '../../core/Typography'

export default function ProfileStats({ followers, following, userID }) {
  const { push } = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => push('Followers', { userID })} style={styles.statsItem}>
        <Typography style={styles.statsTitle} variant='h2'>{followers?.length}</Typography>
        <Typography variant='subtitle' color='secondary'>Followers</Typography>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => push('Following', { userID })} style={styles.statsItem}>
        <Typography style={styles.statsTitle} variant='h2'>{following?.length}</Typography>
        <Typography variant='subtitle' color='secondary'>Following</Typography>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  statsItem: {
    alignItems: 'center',
    margin: 12
  },

  statsTitle: {
    marginBottom: 4
  }
})
