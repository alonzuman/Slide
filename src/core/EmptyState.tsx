import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Typography from './Typography'

type Props = {
  primary?: string
  secondary?: string
  style?: object
}

export default function EmptyState({ style, primary, secondary }: Props) {
  return (
    <View style={{ ...styles.container, ...style }}>
      {!!primary && <Typography style={styles.primary} variant='h3'>{primary}</Typography>}
      {!!secondary && <Typography style={styles.secondary}>{secondary}</Typography>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center'
  },

  primary: {
    marginBottom: 8
  },

  secondary: {
    textAlign: 'center'
  }
})
