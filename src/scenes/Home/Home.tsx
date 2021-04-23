import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import API from '../../API/API'
import Header from '../../core/Header'
import useStreams from '../../hooks/useStreams'
import { useTheme } from '../../hooks/useTheme'
import StartStreamButton from '../Stream/StartStreamButton'
import HomeStreams from './HomeStreams'

export default function Home() {
  const { colors } = useTheme()
  const { refetchStreams, isLoading } = useStreams()

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            colors={[colors.text]}
            tintColor={colors.text}
            refreshing={isLoading}
            onRefresh={refetchStreams}
          />
        )}
      >
        <Header title='Home' />
        <HomeStreams />
      </ScrollView>
      <StartStreamButton />
    </>
  )
}
