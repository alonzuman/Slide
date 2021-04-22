import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Avatar from '../../core/Avatar'
import Typography from '../../core/Typography'
import { formatDistance } from 'date-fns'
import FileUploader from '../../core/FileUploader'
import { useUser } from '../../hooks/useUser'
import { useNavigation } from '@react-navigation/native'

type Props = {
  avatar: string
  name: string
  isMe: boolean
  createdAt?: string
}

export default function ProfileHeader({ avatar, name, isMe, createdAt }: Props) {
  const { updateUser, user } = useUser()
  const { push } = useNavigation()

  return (
    <View style={styles.container}>
      <FileUploader
        onFinish={(downloadURL: string) => updateUser({ avatar: downloadURL })}
        path={`/avatar/${user?._id}`}
        isActive={isMe}
        style={styles.avatar}
        overlayStyle={{ borderRadius: 100 }}
      >
        <Avatar style={styles.avatar} uri={avatar} size='xxl' />
      </FileUploader>
      <TouchableOpacity
        activeOpacity={.8}
        onPress={() => isMe ? push('Edit Field', { field: 'name', oldValue: user?.name, isRequired: true, placeholder: 'Your full name' }) : null}
      >
        <Typography style={styles.name} variant='h2'>{name}</Typography>
      </TouchableOpacity>
      {!!createdAt && <Typography variant='subtitle' color='secondary'>Joined {formatDistance(Date.parse(createdAt), Date.now())} ago</Typography>}
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
