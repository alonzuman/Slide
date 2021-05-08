
import React from 'react'
import { View, TextInputProps, TextInput, StyleSheet, ViewStyle, StyleSheetProperties } from 'react-native'
import Constants from '../constants/Constants'
import { useTheme } from '../hooks/useTheme'

type Props = {
  style?: ViewStyle & object
  renderBefore?: any
  renderAfter?: any
  inputStyle?: StyleSheetProperties
  error?: string
  // ...TextInputProps
}

export default function TextField({ style, multiline = false, renderBefore, renderAfter, inputStyle, error, ...rest }: Props & TextInputProps) {
  const { colors } = useTheme()

  return (
    <>
      <View
        style={{
          backgroundColor: colors.card,
          borderColor: error ? colors.error : colors.border,
          paddingVertical: multiline ? 4 : 0,
          ...styles.container,
          ...style
        }}
      >
        {renderBefore}
        <TextInput
          style={{
            color: colors.text,
            // fontFamily: Constants.Fonts.h4,
            fontWeight: '400',
            ...styles.input,
            ...inputStyle
          }}
          placeholderTextColor={colors.textAlt}
          multiline={multiline}
          {...rest}
        />
        {renderAfter}
      </View>
      {/* {!!error && <Typography variant='subtitle' style={{ marginLeft: 12, marginTop: 4, color: colors.notification }}>{error}</Typography>} */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
    padding: 12,
    fontSize: 16,
    flex: 1,
  }
})
