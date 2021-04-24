
import React from 'react'
import { View, TextInputProps, TextInput, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import Typography from './Typography'

export default function TextField({ style, renderBefore, inputStyle, error, ...rest }: TextInputProps) {
  const { colors } = useTheme()

  return (
    <>
      <View
        style={{
          backgroundColor: colors.cardAlt,
          borderColor: error ? colors.error : colors.border,
          ...styles.container,
          ...style
        }}
      >
        {renderBefore}
        <TextInput
          style={{ color: colors.text, ...styles.input, ...inputStyle }}
          placeholderTextColor={colors.textAlt}
          {...rest}
        />
      </View>
      {!!error && <Typography variant='subtitle' style={{ marginLeft: 12, marginTop: 4, color: colors.notification }}>{error}</Typography>}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
    padding: 12,
    fontSize: 16,
    flex: 1,
  }
})
