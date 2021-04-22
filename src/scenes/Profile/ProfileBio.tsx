import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Typography from '../../core/Typography'

type Props = {
  bio?: string,
  isMe?: boolean
}

export default function ProfileBio({ bio, isMe }: Props) {
  const { push } = useNavigation()

  if (!bio && !isMe) return null;

  return (
    <TouchableOpacity
      activeOpacity={.8}
      onPress={() => isMe ? push('Edit Field', { field: 'bio', oldValue: bio, isRequired: false, placeholder: 'Tell us about yourself!', multiline: true, numberOfLines: 4 }) : null}
      style={styles.container}
    >
      {isMe && !bio && <Typography style={styles.bio}>Press here to edit your bio</Typography>}
      <Typography style={styles.bio}>{bio}</Typography>
    </TouchableOpacity>
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
