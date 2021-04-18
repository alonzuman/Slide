import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Countries from '../../constants/Countries'
import ListItem from '../../core/ListItem'
import Modal from '../../core/Modal'
import TextField from '../../core/TextField'
import Typography from '../../core/Typography'
import { useTheme } from '../../hooks/useTheme'

export default function LocaleSelector({ value, onChange, isOpen, onClose }) {
  const selected = Countries?.find(v => v.code === value)

  return (
    <Modal
      title='Select country'
      isOpen={isOpen}
      onClose={onClose}
    >
      {Countries.map(({ value, label, emoji }) => (
        <ListItem
          key={value}
          renderBefore={<Typography variant='h3'>{emoji}</Typography>}
          primary={label}
          secondary={value}
          onPress={() => {
            onChange(value)
            onClose()
          }}
        />
      ))}
    </Modal>
  )
}
