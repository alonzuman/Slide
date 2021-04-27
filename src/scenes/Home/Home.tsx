import { useNavigation } from '@react-navigation/core'
import React, { useLayoutEffect } from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import Typography from '../../core/Typography'
import useStreams from '../../hooks/useStreams'
import { useTheme } from '../../hooks/useTheme'
import StreamStartButton from '../Stream/StreamStartButton'
import HomeStreams from './HomeStreams'

export default function Home() {
  const { colors } = useTheme()
  const { setOptions } = useNavigation()
  const { refetchStreams, isLoading } = useStreams()

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => <Typography variant='h2' style={{ marginLeft: 12 }}>Home</Typography>,
      headerTitle: ''
    })
  }, [setOptions])

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
