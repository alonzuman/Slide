import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextField from './TextField'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from '../hooks/useTheme'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function SearchField({ style, placeholder, value, onChangeText }) {
  const { colors } = useTheme()

  return (
    <TextField
      renderBefore={(<AntDesign style={{ marginLeft: 12 }} name='search1' color={colors.textAlt} size={18} />)}
      // renderAfter={(
      //   <TouchableOpacity
      //     onPress={() => onChangeText('')}
      //   >
      //     <AntDesign
      //       style={{ marginRight: 12 }}
      //       color={colors.textAlt}
      //       size={18}
      //       name='closecircle'
      //     />
      //   </TouchableOpacity>
      // )}
      style={style}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  )
}
