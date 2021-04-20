import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { useQuery } from 'react-query'
import API from '../../API/API'
import PrimaryButton from '../../core/PrimaryButton'
import { useTheme } from '../../hooks/useTheme'
import StartStreamButton from '../Stream/StartStreamButton'
import HomeStreams from './HomeStreams'

export default function Home() {
  const { colors } = useTheme()
  const { refetch: refetchStreams, isFetching } = useQuery('streams', API.Streams.fetchLiveStreams)

  const handleRefresh = () => {
    refetchStreams()
  }

  const onPress = () => API.Activity.sendNotification('604c91c14e08f867fd1fed59', 'test', 'test', 'https://images.unsplash.com/photo-1592014150680-9153512d65df?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'test')

  return (
    <>
      <PrimaryButton onPress={onPress} title='noti' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            colors={[colors.text]}
            tintColor={colors.text}
            refreshing={isFetching}
            onRefresh={handleRefresh}
          />
        )}
      >
        <HomeStreams />
      </ScrollView>
      <StartStreamButton />
    </>
  )
}
