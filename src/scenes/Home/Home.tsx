import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CardStream from '../../core/CardStream'
import Typography from '../../core/Typography'
import { useHome } from '../../hooks/useHome'
import { useTheme } from '../../hooks/useTheme'
import { fetchHomeSections, refreshHomeSections } from '../../slices/home'
import StartStreamButton from '../Stream/StartStreamButton'

export default function Home({ navigation }) {
  const { colors } = useTheme()
  const { streams } = useHome()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchHomeSections())
  }, [])

  const handleRefresh = () => {
    dispatch(refreshHomeSections())
    dispatch(fetchHomeSections())
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            colors={[colors.text]}
            tintColor={colors.text}
            refreshing={streams?.isLoading}
            onRefresh={handleRefresh}
          />
        )}
      >
        <View style={styles.container}>
          {streams?.data?.map(({ _id, meta }) => (
            <CardStream
              key={_id}
              style={styles.card}
              onPress={() => {
                navigation.push('Stream', {
                  screen: 'Stream',
                  params: { streamID: _id }
                })
              }}
              name={meta?.name}
              imageURI={meta?.imageURI}
            />
          ))}
        </View>
      </ScrollView>
      <StartStreamButton />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 8
  },

  card: {
    margin: 6
  }
})
