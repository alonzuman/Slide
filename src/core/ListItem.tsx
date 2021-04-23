import React from 'react'
import { View, TouchableOpacity, ViewStyle, StyleSheet } from 'react-native'
import Typography from './Typography'

type Props = {
  primary?: string,
  secondary?: string,
  label?: string,
  renderBefore?: any,
  renderAfter?: any,
  onPress?: Function,
  style?: ViewStyle
  renderPrimary?: any
  renderLabel?: any
}

export default function ListItem({ primary, renderLabel, renderPrimary, secondary, label, renderBefore, renderAfter, onPress, style }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={.8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        justifyContent: 'space-between',
        ...style
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', flexShrink: 1, alignItems: 'center' }}>
        {renderBefore}
        <View
          style={{
            paddingHorizontal: 12
          }}
        >
          {!!label && <Typography style={styles.label} variant='subtitle' color='secondary'>{label}</Typography>}
          {!!primary && <Typography style={styles.primary} variant='h4'>{primary}</Typography>}
          {renderLabel}
          {renderPrimary}
          {!!secondary && <Typography style={styles.secondary} variant='subtitle' color='secondary'>{secondary}</Typography>}
        </View>
      </View>
      {renderAfter}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  primary: {
    fontWeight: '500',
    flexShrink: 0,
  },

  secondary: {
    flexShrink: 0,
  },

  label: {
    fontSize: 12
  }
})
