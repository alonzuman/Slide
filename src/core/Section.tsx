import React, { ReactChildren, ReactElement } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import Typography from './Typography'

type Props = {
  children: any
  title?: string
  style?: ViewStyle
  action?: ReactElement | null | false
  subtitle?: string
}

export default function Section({ children, title, style, subtitle, action }: Props) {
  return (
    <>
      <View style={styles.header}>
        <View>
          {!!title && <Typography style={styles.title} variant='h3'>{title}</Typography>}
          {/* {!!subtitle && <Typography style={styles.subtitle} variant='subtitle' color='secondary'>{subtitle}</Typography>} */}
        </View>
        {action}
      </View>
      <View style={{ ...styles.content, marginTop: !title ? 12 : 0, ...style, }}>
        {children}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4
  },

  title: {
    paddingHorizontal: 12,
    marginTop: 12,
  },

  subtitle: {
    paddingHorizontal: 12,
    marginBottom: 8
  },

  content: {
    marginBottom: 24
  }
})
