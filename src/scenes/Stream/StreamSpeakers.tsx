import React from 'react'
import { View, Text, FlatList } from 'react-native'
import Typography from '../../core/Typography'
import { useStream } from '../../hooks/useStream'
import StreamSpeaker from './StreamSpeaker'

export default function StreamSpeakers() {
  const { speakers, activeSpeaker } = useStream()

  return (
    <View>
      <FlatList
        data={speakers?.filter(v => v?.streamID !== activeSpeaker)}
        keyExtractor={item => item?._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <StreamSpeaker
            style={{ marginLeft: index === 0 ? 12 : 0, marginRight: 12 }}
            speakerID={item?.streamID}
            avatar={item?.avatar}
            name={item?.name}
            userID={item?._id}
          />
        )}
      />
    </View>
  )
}
