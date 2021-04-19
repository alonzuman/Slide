import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useQuery } from 'react-query'
import API from '../../API/API'
import CardStream from '../../core/CardStream'
import Typography from '../../core/Typography'

export default function HomeStreams() {
  const { data: streams, isLoading } = useQuery('streams', API.Streams.fetchLiveStreams)
  const { push } = useNavigation()

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator style={{ marginTop: 24 }} />}
      {!isLoading && streams?.map(({ _id, meta, members }) => (
        <CardStream
          members={members}
          key={_id}
          style={styles.card}
          onPress={() => {
            push('Stream', {
              screen: 'Stream',
              params: { streamID: _id }
            })
          }}
          name={meta?.name}
          imageURL={meta?.imageURL}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 8
  },

  card: {
    margin: 6
  }
})
