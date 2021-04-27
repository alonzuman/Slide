import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import Logo from '../../core/Logo';
import PrimaryButton from '../../core/PrimaryButton';
import TextField from '../../core/TextField';
import useAuth from '../../hooks/useAuth';
import styles from './styles';

export default function AuthConfirmCode() {
  const { isLoading, updateField, confirmationResult, confirmationCode } = useAuth()

  async function confirmCode() {
    updateField('isLoading', true)
    try {
      await confirmationResult.confirm(confirmationCode);
    } catch (err) {
      console.log(err);
      updateField('error', 'Invalid code')
    }
    updateField('isLoading', false)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Logo style={styles.logo} />
      <TextField
        placeholder='Confirmation code'
        style={styles.input}
        value={confirmationCode}
        onChangeText={text => updateField('confirmationCode', text)}
      />
      <PrimaryButton
        style={styles.input}
        isLoading={isLoading}
        title="Confirm"
        onPress={() => confirmCode()}
      />
    </KeyboardAvoidingView>
  )
}
