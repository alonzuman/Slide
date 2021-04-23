import React, { useEffect, useState } from 'react'
import { View, KeyboardAvoidingView, Platform } from 'react-native'
import Header from '../../core/Header'
import PrimaryButton from '../../core/PrimaryButton'
import TextField from '../../core/TextField'
import Typography from '../../core/Typography'
import { useUser } from '../../hooks/useUser'

export default function OnBoardingName({ navigation }) {
  const { user, isUpdating, updateUser } = useUser()
  const [name, setName] = useState('')

  const handleFinish = async () => {
    updateUser({
      name,
      onBoarding: { ...user.onBoarding, name: true }
    })

    navigation.navigate('Profile Picture')
  }

  useEffect(() => {
    setName(user?.name)

    if (user?.onBoarding?.name) {
      navigation.navigate('Profile Picture')
    }
  }, [user?.onBoarding?.name])

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ padding: 12, justifyContent: 'center', flex: 1 }}>
        <Header
          centered
          title='Hi!👋'
          subtitle='Welcome to Slide! how about you start off by telling us your name?'
        />
        <TextField
          style={{
            marginBottom: 12
          }}
          placeholder='Full name'
          value={name}
          onChangeText={setName}
        />
        <PrimaryButton
          title='Update'
          disabled={name?.length < 3}
          onPress={handleFinish}
          isLoading={isUpdating}
        />
      </View>
    </KeyboardAvoidingView>
  )
}
