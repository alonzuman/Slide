import React from 'react'
import { Switch } from 'react-native'
import ListItem from '../../core/ListItem'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from '../../hooks/useTheme'

export default function SettingsAppearance() {
  const { type, colors } = useTheme()

  return (
    <ListItem
      renderBefore={<Feather name={type === 'dark' ? 'moon' : 'sun'} size={18} color={colors.text} />}
      primary='Theme'
      renderAfter={(
        <Switch />
      )}
    />
  )
}
