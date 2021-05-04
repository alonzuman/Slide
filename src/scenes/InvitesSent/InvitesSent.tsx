import React from 'react'
import { ScrollView } from 'react-native'
import Avatar from '../../core/Avatar'
import DefaultButton from '../../core/DefaultButton'
import EmptyState from '../../core/EmptyState'
import HeaderLeft from '../../core/HeaderLeft'
import ListItem from '../../core/ListItem'
import SecondaryButton from '../../core/SecondaryButton'
import useInvites from '../../hooks/useInvites'
import useScreenOptions from '../../hooks/useScreenOptions'

export default function InvitesSent() {
  const { myInvites } = useInvites()

  useScreenOptions({
    headerLeft: () => <HeaderLeft />
  })

  return (
    <ScrollView>
      {myInvites?.length === 0 && (
        <EmptyState
          secondary={`Here is where you will see the status of the invites you've sent.`}
        />
      )}
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
