import React from 'react'
import { View, Text } from 'react-native'
import Avatar from '../../core/Avatar'
import ListItem from '../../core/ListItem'
import { useStream } from '../../hooks/useStream'

export default function AudienceModal() {
  const { audience } = useStream()

  return (
    <>
      {audience?.map(({ avatar, name, _id }) => (
        <ListItem
          key={_id}
          primary={name}
          renderBefore={<Avatar size='m' uri={avatar} />}
        />
      ))}
    </>
  )
}
