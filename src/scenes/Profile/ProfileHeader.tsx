import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Avatar from '../../core/Avatar'
import Typography from '../../core/Typography'
import {formatDistance} from 'date-fns'

export default function ProfileHeader({ avatar, name, createdAt }) {
  return (
    <View style={styles.container}>
      <Avatar style={styles.avatar} uri={avatar} size='xxl' />
      <Typography style={styles.name} variant='h2'>{name}</Typography>
      <Typography variant='subtitle' color='secondary'>Joined {formatDistance(Date.parse(createdAt), Date.now())} ago</Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 12
  },

  avatar: {
    marginBottom: 8
  },

  name: {
    marginBottom: 4
  }
})
