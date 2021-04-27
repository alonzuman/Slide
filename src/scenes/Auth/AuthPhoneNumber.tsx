import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import TextField from '../../core/TextField';
import PrimaryButton from '../../core/PrimaryButton';
import LocaleSelector from '../../core/LocaleSelector';
import Typography from '../../core/Typography';
import { useTheme } from '../../hooks/useTheme';
import Countries from '../../constants/Countries';
import Logo from '../../core/Logo';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';

export default function AuthPhoneNumber() {
  const {
    updateField,
    isLocaleModalOpen,
    isLoading,
    error,
    phoneNumber,
    confirmationResult,
    countryCode
  } = useAuth()
  const { push } = useNavigation()
  const { colors } = useTheme()
  const selected = Countries?.find(v => v.value === countryCode)

  async function signInWithPhoneNumber() {
    if (!phoneNumber) return updateField('error', 'This field is required')
    updateField('isLoading', true)
    const confirmation = await auth().signInWithPhoneNumber(countryCode + phoneNumber);
    updateField('confirmationResult', confirmation)
    updateField('isLoading', false)
  }

  useEffect(() => {
    if (confirmationResult) {
      push('Auth Confirm Code')
    }
  }, [confirmationResult])

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Logo style={{ alignSelf: 'center', height: 48, width: 112, marginBottom: 8 }} />
      <View style={styles.phoneInputContainer}>
        <TouchableOpacity
          style={{ backgroundColor: colors.cardAlt, borderColor: colors.border, ...styles.countryCode }}
          onPress={() => updateField('isLocaleModalOpen', true)}
        >
          <Typography>{selected?.emoji}</Typography>
          <Typography style={styles.countryCodeText}>{selected?.value}</Typography>
        </TouchableOpacity>
        <TextField
          style={{ ...styles.input, flex: 1 }}
          value={phoneNumber}
          keyboardType='number-pad'
          placeholder='Phone number'
          onChangeText={text => updateField('phoneNumber', text)}
        />
      </View>
      {!!error && <Typography style={styles.error} variant='subtitle' color='error'>{error}</Typography>}
      <PrimaryButton
        isLoading={isLoading}
        style={styles.input}
        title="Next"
        onPress={() => signInWithPhoneNumber()}
      />
      <LocaleSelector
        isOpen={isLocaleModalOpen}
        onClose={() => updateField('isLocaleModalOpen', false)}
        onChange={v => updateField('countryCode', v)}
      />
    </KeyboardAvoidingView>
  )
}
