
import React from 'react'
import { View, Text, TextInputProps, ViewStyle, TextInput, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'

export default function TextField({ style, renderBefore, ...rest }: TextInputProps) {
  const { colors } = useTheme()

  return (
    <View
      style={{
        backgroundColor: colors.cardAlt,
        borderColor: colors.border,
        ...styles.container,
        ...style
      }}
    >
      {renderBefore}
      <TextInput
        style={{ color: colors.text, ...styles.input }}
        placeholderTextColor={colors.textAlt}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8
  },

  input: {
    padding: 12,
    fontSize: 16
  }
})
