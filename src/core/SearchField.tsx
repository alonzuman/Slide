import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextField from './TextField'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from '../hooks/useTheme'

export default function SearchField({ style, placeholder, value, onChangeText }) {
  const { colors } = useTheme()

  return (
    <TextField
      renderBefore={(<AntDesign style={styles.icon} name='search1' color={colors.textAlt} size={18} />)}
      style={style}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 12
  }
})
