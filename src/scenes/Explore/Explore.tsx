import React from 'react'
import { ScrollView } from 'react-native'
import Typography from '../../core/Typography'
import useScreenOptions from '../../hooks/useScreenOptions'
import { useTheme } from '../../hooks/useTheme'
import ExplorePeople from './ExplorePeople'
import ExploreSearchBar from './ExploreSearchBar'

export default function Explore() {
  useScreenOptions({
    headerTitle: '',
    headerLeft: () => <Typography variant='h2' style={{ marginLeft: 12 }}>Explore</Typography>,
  })

  return (
    <ScrollView>
      <ExploreSearchBar />
      <ExplorePeople />
    </ScrollView>
  )
}
