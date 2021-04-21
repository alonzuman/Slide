import React from 'react'
import { View, Text } from 'react-native'
import Typography from '../../core/Typography'

type Props = {
  nomination: object
}

export default function ProfileNomination({ nomination }: Props) {
  console.log(nomination)

  return (
    <View>
      <Typography>{JSON.stringify(nomination, null, 2)}</Typography>
    </View>
  )
}
