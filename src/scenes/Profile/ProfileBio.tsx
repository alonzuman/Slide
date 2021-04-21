import React from 'react'
import { View, StyleSheet } from 'react-native'
import Typography from '../../core/Typography'

type Props = {
  bio?: string,
  isMe?: boolean
}

export default function ProfileBio({ bio, isMe }: Props) {
  if (!bio) return null;

  return (
    <View style={styles.container}>
      <Typography style={styles.bio}>{bio}</Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },

  bio: {
    textAlign: 'center'
  }
})
