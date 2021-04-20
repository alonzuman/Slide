import React from 'react'
import Avatar from '../../core/Avatar'
import ListItem from '../../core/ListItem'
import useStreamMembers from '../../hooks/useStreamMembers'

export default function AudienceModal() {
  const { audience } = useStreamMembers()

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
