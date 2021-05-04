import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Constants from '../../constants/Constants'
import AvatarsGroup from '../../core/AvatarsGroup'
import DefaultButton from '../../core/DefaultButton'
import LiveIndicator from '../../core/LiveIndicator'
import useModal from '../../hooks/useModal'
import { useStreamAudience, useStreamID, useStreamMeta } from '../../hooks/useStream'
import { useTheme } from '../../hooks/useTheme'

export default function StreamHeaderRight() {
  const audience = useStreamAudience()
  const meta = useStreamMeta()
  const streamID = useStreamID()
  const { navigate, goBack } = useNavigation()
  const { openModal, closeModal } = useModal()
  const { colors } = useTheme()

  const handleMorePress = () => {
    openModal({
      renderBefore: <AvatarsGroup borderColor='#fff' style={{ marginTop: 12 }} users={audience} max={2} />,
      title: meta?.name,
      renderAfter: (
        <DefaultButton
          onPress={() => {
            navigate('Feedback', {
              type: Constants.FeedbackTypes.REPORT_STREAM,
              entityID: streamID,
              headerTitle: `Report ${meta?.name}`
            })
            closeModal()
          }}
          size='l'
          labelStyle={{ color: colors.error }}
          title='Report'
        />
      ),
      type: 'GENERAL/SELECT'
    })
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <LiveIndicator style={{ marginRight: 12 }} />
      <TouchableOpacity onPress={handleMorePress} style={{ marginRight: 12 }}>
        <MaterialIcons name='more-horiz' size={24} color='#fff' />
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack} style={{ marginRight: 12 }}>
        <Entypo name='chevron-down' size={24} color='#fff' />
      </TouchableOpacity>
    </View>
  )
}
