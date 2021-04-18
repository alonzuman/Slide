import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UserProfile } from '../types'
import Avatar from './Avatar'
import Typography from './Typography'

type Props = {
  max?: number
  size?: 'xs' | 's' | 'm' | 'l'
  users?: UserProfile[]
  onPress?: Function
}

export default function AvatarsGroup({ onPress, users, size, max = 2 }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {users?.map(({ avatar }, index) => (
        <Avatar
          uri={avatar}
          size={size}
          key={avatar}
          style={{ marginLeft: index === 0 ? 0 : -8 }}
        />
      ))}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
})
