import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Constants from '../../constants/Constants'
import Avatar from '../../core/Avatar'
import DefaultButton from '../../core/DefaultButton'
import FileUploader from '../../core/FileUploader'
import PrimaryButton from '../../core/PrimaryButton'
import Typography from '../../core/Typography'
import { useUser } from '../../hooks/useUser'

export default function OnBoardingAvatar({ navigation }) {
  const [avatar, setAvatar] = useState('')
  const { user, updateUser, isUpdating } = useUser()

  useEffect(() => {
    setAvatar(user?.avatar)
  }, [user])

  const handlePress = async () => {
    updateUser({
      avatar: avatar || Constants.Images.Avatar,
      onBoarding: { ...user.onBoarding, avatar: true }
    })

    navigation.navigate('Pick Your Interests')
  }

  useEffect(() => {
    if (user?.onBoarding?.avatar) {
      navigation.navigate('Pick Your Interests')
    }
  }, [user?.onBoarding?.avatar])

  return (
    <View style={{ padding: 12, justifyContent: 'center', flex: 1 }}>
      <Typography style={{ textAlign: 'center', marginBottom: 8 }} variant='h1'>
        Upload a profile picture!
      </Typography>
      <Typography style={{ textAlign: 'center', marginBottom: 12 }} variant='body' color='secondary'>
        Choose a profile picture and show us how handsome you are 😏
      </Typography>
      <FileUploader
        isActive={true}
        onFinish={url => setAvatar(url)}
        path={`/avatars/${user?._id}`}
      >
        <Avatar
          style={{ alignSelf: 'center', marginVertical: 12 }}
          uri={avatar}
          size='xl'
        />
      </FileUploader>
      <Typography style={{ marginBottom: 24, alignSelf: 'center' }} variant='h2'>
        {user?.name}
      </Typography>
      <PrimaryButton
        onPress={handlePress}
        isLoading={isUpdating}
        disabled={!avatar}
        title='Looks great!'
        style={{
          marginBottom: 12
        }}
      />
      <DefaultButton
        title='Skip'
        onPress={handlePress}
      />
    </View>
  )
}
