import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DefaultButton from '../../core/DefaultButton'
import PrimaryButton from '../../core/PrimaryButton'
import Typography from '../../core/Typography'
import MeInterestsPicker from '../../core/InterestsPicker'
import { useUser } from '../../hooks/useUser'
import API from '../../API/API'

export default function OnBoardingInterests() {
  const { user, isUpdating, updateUser } = useUser()
  const [interests, setInterests] = useState<object[] | null>([])

  useEffect(() => {
    setInterests(user?.interests || [])
  }, [])

  const handleFinish = async () => {
    await API.Notifications.sendNotification(
      user.invite.byuser?._id,
      `${user?.name} has joined SlideTV`,
      `Your friend ${user?.name} has joined SlideTV using your invite!`,
      '',
      'whenUserIInvitedJoined'
    )

    updateUser({
      interests,
      onBoarding: { ...user.onBoarding, interests: true }
    })
  }

  const handlePress = tag => {
    setInterests(prev =>
      prev?.includes(tag) ?
        prev?.filter(v => v !== tag) :
        [...interests, tag]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Typography style={styles.title} variant="h1">Pick your interests</Typography>
      <Typography style={styles.subtitle} variant="body" color='secondary'>Choose topics or interests, and we'll build a personalized feed just for you ❤️</Typography>
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
      />
    </SafeAreaView>
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
