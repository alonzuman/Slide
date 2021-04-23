import React from 'react'
import { View, Text } from 'react-native'
import { useQuery } from 'react-query'
import API from '../API/API'

export default function useStreams() {
  const { data: streams, isLoading, refetch: refetchStreams } = useQuery('streams', API.Streams.fetchLiveStreams)
  return { streams, isLoading, refetchStreams }
}
