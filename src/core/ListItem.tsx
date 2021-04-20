import React from 'react'
import { View, TouchableOpacity, ViewStyle } from 'react-native'
import Typography from './Typography'

type Props = {
  primary?: string,
  secondary?: string,
  label?: string,
  renderBefore?: any,
  renderAfter?: any,
  onPress?: Function,
  style?: ViewStyle
}

export default function ListItem({ primary, secondary, label, renderBefore, renderAfter, onPress, style }: Props) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        justifyContent: 'space-between',
        ...style
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {renderBefore}
        <View
          style={{
            paddingHorizontal: 12
          }}
        >
          {!!label && <Typography variant='subtitle' color='secondary'>{label}</Typography>}
          {!!primary && <Typography variant='h4'>{primary}</Typography>}
          {!!secondary && <Typography variant='subtitle' color='secondary'>{secondary}</Typography>}
        </View>
      </View>
      {renderAfter}
    </TouchableOpacity>
  )
}
