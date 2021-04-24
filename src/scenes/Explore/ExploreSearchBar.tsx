import React from 'react'
import { StyleSheet } from 'react-native'
import useExplore from '../../hooks/useExplore'
import SearchField from '../../core/SearchField'

export default function ExploreSearchBar() {
  const { keyword, setKeyword } = useExplore()

  return (
    <SearchField
      placeholder={"Search for streams, topics and people"}
      style={styles.input}
      value={keyword}
      onChangeText={setKeyword}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    marginTop: 0
  },
})
