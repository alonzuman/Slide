import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import TextField from '../../core/TextField';
import PrimaryButton from '../../core/PrimaryButton';
import LocaleSelector from './LocaleSelector';
import Typography from '../../core/Typography';
import { useTheme } from '../../hooks/useTheme';
import Countries from '../../constants/Countries';

export default function PhoneSignIn() {
  // If null, no SMS has been sent
  const [countryCode, setCountryCode] = useState('+972')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [confirm, setConfirm] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { colors } = useTheme()
  const selected = Countries?.find(v => v.value === countryCode)

  // Handle the button press
  async function signInWithPhoneNumber() {
    if (!phoneNumber) return;
    setIsLoading(true)
    const confirmation = await auth().signInWithPhoneNumber(countryCode + phoneNumber);
    setConfirm(confirmation);
    setIsLoading(false)
  }

  async function confirmCode() {
    setIsLoading(true)
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
    setIsLoading(false)
  }

  const _render = () => {
    if (!confirm) {
      return (
        <>
          <View style={styles.phoneInput}>
            <TouchableOpacity
              style={{ backgroundColor: colors.cardAlt, borderColor: colors.border, ...styles.countryCode }}
              onPress={() => setIsOpen(true)}
            >
              <Typography>{`${selected?.emoji} ${selected?.value}`}</Typography>
            </TouchableOpacity>
            <TextField
              style={{ ...styles.input, flex: 1 }}
              value={phoneNumber}
              keyboardType='number-pad'
              placeholder='Phone number'
              onChangeText={setPhoneNumber}
            />
          </View>
          <PrimaryButton
            isLoading={isLoading}
            style={styles.input}
            title="Next"
            onPress={() => signInWithPhoneNumber(phoneNumber)}
          />
        </>
      );
    } else {
      return (
        <>
          <TextField
            placeholder='Confirmation code'
            style={styles.input}
            value={code}
            onChangeText={text => setCode(text)}
          />
          <PrimaryButton
            style={styles.input}
            isLoading={isLoading}
            title="Confirm"
            onPress={() => confirmCode()}
          />
        </>
      )
    }
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {_render()}
      <LocaleSelector
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={countryCode}
        onChange={v => setCountryCode(v)}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  input: {
    marginTop: 12,
    marginHorizontal: 12
  },

  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  countryCode: {
    marginTop: 12,
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12
  }
})
