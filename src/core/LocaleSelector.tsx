import React from 'react'
import Countries from '../constants/Countries'
import ListItem from './ListItem'
import Modal from './Modal'
import Typography from './Typography'

export default function LocaleSelector({ onChange, isOpen, onClose }) {
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
