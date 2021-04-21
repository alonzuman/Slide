import AntDesign from 'react-native-vector-icons/AntDesign'
import React from 'react'
import { StyleSheet } from 'react-native'
import TextField from '../../core/TextField'
import { useTheme } from '../../hooks/useTheme'
import useExplore from '../../hooks/useExplore'

export default function ExploreSearchBar() {
  const { colors } = useTheme()
  const { keyword, setKeyword } = useExplore()

  return (
    <TextField
      renderBefore={(<AntDesign style={styles.icon} name='search1' color={colors.textAlt} size={18} />)}
      style={styles.input}
      placeholder="Search for streams, topics and people"
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

  icon: {
    marginLeft: 12
  }
})
