import { useNavigation } from '@react-navigation/native'
import { formatDistance } from 'date-fns/esm'
import React from 'react'
import Avatar from '../../core/Avatar'
import ListItem from '../../core/ListItem'
import Section from '../../core/Section'

type Props = {
  nomination: object
}

export default function ProfileNomination({ nomination }: Props) {
  const { push } = useNavigation()

  return (
    <Section title='Nominated by'>
      <ListItem
        onPress={() => push('User Profile', { userID: nomination?.byUser?._id })}
        renderBefore={(
          <Avatar size='m' uri={nomination?.byUser?.avatar} />
        )}
        primary={nomination?.byUser?.name}
        secondary={nomination?.createdAt && `${formatDistance(Date.parse(nomination?.createdAt), Date.now())} ago`}
      />
    </Section>
  )
}
