import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import PrimaryButton from '../../core/PrimaryButton';
import TextField from '../../core/TextField';
import useScreenOptions from '../../hooks/useScreenOptions';
import { useUser } from '../../hooks/useUser';

export default function MeEditField({ route }) {
  const { setOptions, goBack } = useNavigation()
  const { updateUser, isUpdating } = useUser()
  const {
    field,
    oldValue,
    isRequired = true,
    multiline = false,
    numberOfLines,
    placeholder = ''
  } = route.params;
  const [value, setValue] = useState(oldValue || '')
  const [error, setError] = useState('')

  const handleChangeText = (text: string) => {
    setError('')
    setValue(text)
  }

  const handlePress = () => {
    if (isRequired && !value) return setError('This field is required.')
    updateUser({ [field]: value })
    goBack()
  }

  useScreenOptions({
    headerTitle: `Edit ${field}`,
  })

  useLayoutEffect(() => {
    setOptions({
    })
  }, [field, setOptions])

  return (
    <>
      <TextField
        multiline={multiline}
        numberOfLines={numberOfLines}
        inputStyle={{ height: multiline ? 96 : null }}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChangeText}
        error={error}
      />
      <PrimaryButton
        title='Update'
        style={styles.input}
        isLoading={isUpdating}
        onPress={handlePress}
      />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 12,
    marginTop: 12
  }
})
