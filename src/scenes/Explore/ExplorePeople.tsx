import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import EmptyState from '../../core/EmptyState'
import Section from '../../core/Section'
import UserCard from '../../core/UserCard'
import useExplore from '../../hooks/useExplore'

export default function ExplorePeople() {
  const { push } = useNavigation()
  const { data, isLoading } = useExplore()

  return (
    <Section style={styles.section} title='People'>
      {isLoading && <ActivityIndicator style={styles.spinner} />}
      {!isLoading && data?.users?.length === 0 && <EmptyState secondary='No results found' />}
      {!isLoading && data?.users?.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data?.users}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <UserCard
              onPress={() => push('User Profile', { userID: item?._id })}
              style={{ marginRight: 12, marginLeft: index === 0 ? 12 : 0 }}
              avatar={item?.avatar}
              name={item?.name}
              userID={item?._id}
              followers={item?.followers?.length}
            />
          )}
        />
      )}
    </Section>
  )
}

const styles = StyleSheet.create({
  section: {
    minHeight: 144
  },

  spinner: {
    marginTop: 32
  },

  emptyState: {
    alignSelf: 'center'
  }
})
