import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { useQuery } from 'react-query'
import API from '../../API/API'
import { useTheme } from '../../hooks/useTheme'
import StartStreamButton from '../Stream/StartStreamButton'
import HomeStreams from './HomeStreams'

export default function Home() {
  const { colors } = useTheme()
  const { refetch: refetchStreams, isFetching } = useQuery('streams', API.Streams.fetchLiveStreams)

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            colors={[colors.text]}
            tintColor={colors.text}
            refreshing={isFetching}
            onRefresh={refetchStreams}
          />
        )}
      >
        <HomeStreams />
      </ScrollView>
      <StartStreamButton />
    </>
  )
}
