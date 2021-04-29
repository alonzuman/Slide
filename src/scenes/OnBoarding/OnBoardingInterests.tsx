import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DefaultButton from '../../core/DefaultButton'
import PrimaryButton from '../../core/PrimaryButton'
import MeInterestsPicker from '../../core/InterestsPicker'
import { useUser } from '../../hooks/useUser'
import API from '../../API/API'
import Header from '../../core/Header'

export default function OnBoardingInterests() {
  const { user, isUpdating, updateUser } = useUser()
  const [interests, setInterests] = useState<object[] | null>([])
  const insets = useSafeAreaInsets()

  useEffect(() => {
    setInterests(user?.interests || [])
  }, [])

  const handleFinish = async () => {
    updateUser({
      interests,
      onBoarding: { ...user.onBoarding, interests: true }
    })

    API.Notifications.sendNotification(
      user.invite.byUser?._id,
      `${user?.name} has joined SlideTV`,
      `Your friend ${user?.name} has joined SlideTV using your invite!`,
      '',
      'whenUserIInvitedJoined'
    )
  }

  const handlePress = tag => {
    setInterests(prev =>
      prev?.includes(tag) ?
        prev?.filter(v => v !== tag) :
        [...interests, tag]
    )
  }

  return (
    <View style={styles.container}>
      <Header
        centered
        title='Pick your interests'
        subtitle={`Choose topics or interests, and we' ll build a personalized feed just for you ❤️`}
      />
      <ScrollView contentContainerStyle={styles.grid}>
        <MeInterestsPicker interests={interests} handlePress={handlePress} />
      </ScrollView>
      <PrimaryButton
        isLoading={isUpdating}
        style={styles.button}
        onPress={handleFinish}
        title='Finish!'
      />
      <DefaultButton
        style={styles.button}
        onPress={handleFinish}
        title='Skip'
        style={{ marginBottom: insets.bottom, marginTop: 12 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },

  title: {
    marginBottom: 4,
    textAlign: 'center'
  },

  subtitle: {
    marginBottom: 12,
    textAlign: 'center'
  },

  button: {
    marginTop: 12
  }
})
