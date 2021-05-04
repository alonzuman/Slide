import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Constants from '../../constants/Constants'
import Avatar from '../../core/Avatar'
import DefaultButton from '../../core/DefaultButton'
import FileUploader from '../../core/FileUploader'
import Header from '../../core/Header'
import PrimaryButton from '../../core/PrimaryButton'
import Typography from '../../core/Typography'
import { useUser } from '../../hooks/useUser'

export default function OnBoardingAvatar() {
  const { navigate } = useNavigation()
  const [avatar, setAvatar] = useState('')
  const { user, updateUser, isUpdating } = useUser()

  useEffect(() => {
    setAvatar(user?.avatar)
  }, [user])

  const handleNext = async () => {
    updateUser({
      avatar: avatar || Constants.Images.Avatar,
      onBoarding: { ...user.onBoarding, avatar: true }
    })
  }

  useEffect(() => {
    if (user?.onBoarding?.avatar) {
      navigate('Pick Your Interests')
    }
  }, [user?.onBoarding?.avatar])

  return (
    <View style={{ padding: 12, justifyContent: 'center', flex: 1 }}>
      <Header
        centered
        title='Upload a profile picture!'
        subtitle='Choose a profile picture and show us how handsome you are 😏'
      />
      <FileUploader
        isActive={true}
        onFinish={url => setAvatar(url)}
        path={`/avatars/${user?._id}`}
        style={styles.avatarContainer}
      >
        <Avatar
          style={{ alignSelf: 'center', marginVertical: 12 }}
          uri={avatar}
          size='xl'
        />
      </FileUploader>
      <Typography style={{ marginBottom: 12, alignSelf: 'center' }} variant='h2'>
        {user?.name}
      </Typography>
      <PrimaryButton
        onPress={handleNext}
        isLoading={isUpdating}
        disabled={!avatar}
        title='Looks great!'
        style={{
          marginBottom: 12
        }}
      />
      <DefaultButton
        title='Skip'
        onPress={handleNext}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 12
  }
})
