import React, { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import Chip from '../../core/Chip'
import { useStreamAudience, useStreamRaisedHands, useStreamSpeakers } from '../../hooks/useStream'
import StreamMember from './StreamMember'

const options = [
  {
    label: 'Speakers 🎙️',
    value: 'speakers'
  },
  {
    label: 'Raised Hands ✋',
    value: 'raisedHands'
  },
  {
    label: 'Audience 🧑‍🤝‍🧑',
    value: 'audience'
  }
]

export default function StageModal() {
  const [view, setView] = useState('speakers')
  const speakers = useStreamSpeakers()
  const audience = useStreamAudience()
  const raisedHands = useStreamRaisedHands()

  return (
    <>
      <FlatList
        data={options}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 12 }}
        keyExtractor={({ value }) => value}
        renderItem={({ item, index }) => (
          <Chip
            style={{ marginLeft: index === 0 ? 12 : 0, marginRight: 12 }}
            label={item.label}
            isSelected={view === item.value}
            onPress={() => setView(item.value)}
          />
        )}
      />
      {view === 'speakers' && speakers?.map(({ _id }) => <StreamMember userID={_id} key={_id} />)}
      {view === 'audience' && audience?.map(({ _id }) => <StreamMember userID={_id} key={_id} />)}
      {view === 'raisedHands' && audience?.filter(v => raisedHands?.includes(v._id))?.map(({ _id }) => <StreamMember userID={_id} key={_id} />)}
    </>
  )
}

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },

  chip: {
    marginRight: 12
  }
})
