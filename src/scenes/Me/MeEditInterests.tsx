import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import HeaderLeft from '../../core/HeaderLeft'
import PrimaryButton from '../../core/PrimaryButton'
import MeInterestsPicker from '../../core/InterestsPicker'
import { useUser } from '../../hooks/useUser'
import Header from '../../core/Header'
import useScreenOptions from '../../hooks/useScreenOptions'

export default function MeEditInterests({ navigation }) {
  const { user, isUpdating, updateUser } = useUser()
  const { goBack, setOptions } = useNavigation()
  const [interests, setInterests] = useState([])

  const handlePress = tag => {
    setInterests(prev =>
      prev?.includes(tag) ?
        prev?.filter(v => v !== tag) :
        [...interests, tag]
    )
  }

  const handleFinish = async () => {
    await updateUser({ interests })

    goBack()
  }

  useEffect(() => {
    setInterests(user.interests)
  }, [user])

  useScreenOptions({
    headerTitle: () => null,
    headerLeft: () => <HeaderLeft />,
  })

  return (
    <>
      <Header
        title='Edit Interests'
        subtitle={`Choose topics or interests, and we'll build a personalized feed just for you ❤️`}
        marginTop={12}
      />
      <View style={{ paddingHorizontal: 12, flex: 1 }}>
        <MeInterestsPicker interests={interests} handlePress={handlePress} />
        <PrimaryButton
          style={styles.button}
          title='Update'
          isLoading={isUpdating}
          onPress={handleFinish}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 12
  }
})
