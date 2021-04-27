import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import Typography from '../../core/Typography'
import useScreenOptions from '../../hooks/useScreenOptions'
import useStreams from '../../hooks/useStreams'
import { useTheme } from '../../hooks/useTheme'
import StreamStartButton from '../Stream/StreamStartButton'
import HomeStreams from './HomeStreams'

export default function Home() {
  const { colors } = useTheme()
  const { refetchStreams, isLoading } = useStreams()

  useScreenOptions({
    headerLeft: () => <Typography variant='h2' style={{ marginLeft: 12 }}>Home</Typography>,
    headerTitle: ''
  })

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
        <HomeStreams />
      </ScrollView>
      <StreamStartButton />
    </>
  )
}
