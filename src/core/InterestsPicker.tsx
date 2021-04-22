import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Constants from '../constants/Constants'
import Chip from './Chip'

export default function MeInterestsPicker({ interests, handlePress }) {
  return (
    <ScrollView contentContainerStyle={styles.grid}>
      {Constants.Interests?.map((interest) => (
        <Chip
          key={interest.tag}
          style={styles.gridItem}
          onPress={() => handlePress(interest.tag)}
          label={`${interest.name} ${interest.emoji}`}
          isSelected={interests?.includes?.(interest.tag)}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  gridItem: {
    marginRight: 12,
    marginBottom: 12
  },
})
