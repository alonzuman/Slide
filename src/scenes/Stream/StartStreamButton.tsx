import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import API from '../../API/API'
import PrimaryButton from '../../core/PrimaryButton'
import useStream from '../../hooks/useStream'
import useStreams from '../../hooks/useStreams'
import { useUser } from '../../hooks/useUser'

export default function StartStreamButton() {
  const { navigate } = useNavigation()
  const { refetchStreams } = useStreams()
  const { streamID } = useStream()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

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
    refetchStreams()
  }

  if (!!streamID) return null;

  return (
    <PrimaryButton
      title='Start Stream'
      onPress={handlePress}
      style={styles.button}
      renderBefore={<Ionicons style={{ marginRight: 8 }} name='play' size={18} color='#fff' />}
      isLoading={isLoading}
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
