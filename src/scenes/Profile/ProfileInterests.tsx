import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Constants from '../../constants/Constants'
import Chip from '../../core/Chip'
import DefaultButton from '../../core/DefaultButton'
import Section from '../../core/Section'
import { Interest } from '../../types'

type Props = {
  interests: Interest[],
  isMe?: boolean
}

export default function ProfileInterests({ interests, isMe = false }: Props) {
  const { push } = useNavigation()
  const handleEditPress = () => push('Edit Interests')

  if (!interests?.length && !isMe) return null;

  return (
    <Section
      title='Interests'
      action={isMe && (
        <DefaultButton
          style={styles.editButton}
          size='s'
          title='Edit'
          onPress={handleEditPress}
        />
      )}
    >
      <View style={styles.container}>
        {interests?.map((tag: string) => {
          const interest = Constants.Interests?.find(v => v?.tag === tag)
          const label = `${interest?.emoji} ${interest?.name}`
          return (
            <Chip
              key={tag}
              style={styles.chip}
              label={label}
            />
          )
        })}
      </View>
    </Section>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 12
  },

  chip: {
    marginRight: 12,
    marginBottom: 12
  },

  editButton: {
    marginRight: 8
  }
})
