import React from 'react'
import { View, Text } from 'react-native'
import DefaultButton from '../../core/DefaultButton'
import Typography from '../../core/Typography'
import auth from '@react-native-firebase/auth'

export default function Settings() {
  return (
    <View>
      <DefaultButton title='Sign out' onPress={() => auth().signOut()} />
    </View>
  )
}
