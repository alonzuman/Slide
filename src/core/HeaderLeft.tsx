import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme } from '../hooks/useTheme'

export default function HeaderLeft({ onPress, mode = 'card' }: { color?: string, mode?: 'card' | 'modal' }) {
  const { goBack } = useNavigation()
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={{ marginLeft: 12 }}
      activeOpacity={.8}
      onPress={() => onPress ? onPress?.() : goBack()}>
      <Entypo
        name={`chevron-${mode === 'card' ? 'left' : 'down'}`}
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  )
}
