import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Typography from './Typography'

type Props = {
  title: string
  subtitle?: string
  disableMarginTop?: Boolean
  marginTop?: number | null
  action?: Element | null
}

export default function Header({ title, subtitle = '', disableMarginTop = false, marginTop = 0, action }: Props) {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ paddingHorizontal: 12, paddingBottom: 8, paddingTop: disableMarginTop ? 0 : marginTop || (insets.top + 12 || 12) }}>
      <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Typography style={{ fontSize: 24 }} variant='h1'>{title}</Typography>
        {action}
      </View>
      {!!subtitle && <Typography style={styles.subtitle} variant='body' color='secondary'>{subtitle}</Typography>}
    </View>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 4
  }
})
