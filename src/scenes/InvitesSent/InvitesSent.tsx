import React from 'react'
import { ScrollView } from 'react-native'
import Avatar from '../../core/Avatar'
import DefaultButton from '../../core/DefaultButton'
import ListItem from '../../core/ListItem'
import SecondaryButton from '../../core/SecondaryButton'
import useInvites from '../../hooks/useInvites'

export default function InvitesSent() {
  const { myInvites } = useInvites()

  return (
    <ScrollView>
      {myInvites?.map(({ _id, avatar, fulfilled, name }) => (
        <ListItem
          renderBefore={<Avatar uri={avatar} size='m' />}
          primary={name}
          key={_id}
          renderAfter={fulfilled ? <DefaultButton title='Joined!' size='s' /> : <SecondaryButton title='Pending' size='s' />}
        />
      ))}
    </ScrollView>
  )
}
