import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import API from '../../API/API'
import PrimaryButton from '../../core/PrimaryButton'
import { useUser } from '../../hooks/useUser'

export default function StartStreamButton() {
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const { data: user } = useUser()

  const handlePress = async () => {
    setIsLoading(true)
    const newStream = await API.Streams.createStream({
      meta: {
        name: '',
        description: '',
        imageURI: user?.avatar,
      },
      isLive: true
    })

    setIsLoading(false)
    navigate('Stream', {
      screen: 'Stream',
      params: { streamID: newStream?._id }
    })
  }

  return (
    <PrimaryButton
     title='Start Stream'
     onPress={handlePress}
     style={styles.button}
     />
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    alignSelf: 'center',
    width: 164,
    bottom: 12
  }
})
