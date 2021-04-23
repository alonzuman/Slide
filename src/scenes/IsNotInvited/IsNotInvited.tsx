import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DefaultButton from '../../core/DefaultButton'
import Header from '../../core/Header'
import Typography from '../../core/Typography'

export default function IsNotInvited() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header
          centered
          title='Sorry 😞'
          subtitle='It seems that you are simply not cool enough to enjoy our divine platform. You can always just try instagram or something.'
        />
        <DefaultButton
          style={{ marginTop: 12 }}
          onPress={() => alert('Working on it...')}
          title='Go to instagram or something'
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 12
  },

  text: {
    textAlign: 'center',
    marginBottom: 12
  }
})
