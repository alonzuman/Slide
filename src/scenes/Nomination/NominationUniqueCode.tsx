import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import API from '../../API/API'
import SignOutButton from '../../common/SignOutButton'
import Logo from '../../core/Logo'
import PrimaryButton from '../../core/PrimaryButton'
import TextField from '../../core/TextField'
import Typography from '../../core/Typography'
import { useUser } from '../../hooks/useUser'

export default function NominationUniqueCode() {
  const { updateUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  const handlePress = async () => {
    setIsLoading(true)
    try {
      const data = await API.Invites.approveUniqueCode(code)

      if (data) {
        updateUser({ uniqueCode: code })
      }
    } catch (error) {
      console.log(error)
      // setError('Your unique could not be verified')
    }
    setIsLoading(false)
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Logo style={styles.logo} />
        <Typography style={styles.text} variant='body' color='secondary'>Enter your unique 6 characters code</Typography>
        <TextField
          style={styles.input}
          placeholder='Unique 6 characters code'
          value={code}
          onChangeText={setCode}
        // error={error}
        />
        <PrimaryButton
          onPress={handlePress}
          isLoading={isLoading}
          style={styles.input}
          title='Next'
        />
        <SignOutButton style={styles.input} />
      </View>
    </KeyboardAvoidingView>
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

  logo: {
    alignSelf: 'center',
    height: 48,
    width: 112,
    marginBottom: 8
  },

  text: {
    textAlign: 'center'
  },

  input: {
    marginTop: 12
  },
})
