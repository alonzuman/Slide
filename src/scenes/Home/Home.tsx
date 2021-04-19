import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import API from '../../API/API'
import CardStream from '../../core/CardStream'
import Typography from '../../core/Typography'
import { useHome } from '../../hooks/useHome'
import { useTheme } from '../../hooks/useTheme'
import { fetchHomeSections, refreshHomeSections } from '../../slices/home'
import StartStreamButton from '../Stream/StartStreamButton'
import HomeStreams from './HomeStreams'

export default function Home({ navigation }) {
  const { colors } = useTheme()
  const { refetch: refetchStreams, isFetching } = useQuery('streams', API.Streams.fetchLiveStreams)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchHomeSections())
  }, [])

  const handleRefresh = () => {
    refetchStreams()
  }

  return (
    <>
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
