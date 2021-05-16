import React, { ReactElement } from 'react'
import { View, ScrollView, TouchableHighlight, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import Modal from 'react-native-modalbox'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Constants from '../constants/Constants'
import { useTheme } from '../hooks/useTheme'
import DefaultButton from './DefaultButton'
import Typography from './Typography'

type Props = {
  isOpen: boolean
  onClose: Function
  height?: number
  title?: string
  body?: string
  severity?: string
  children?: ReactElement | null
  position?: 'bottom' | 'center' | 'top'
}

export default function ({ isOpen, onClose, height = 320, title, renderBefore, body, action, severity = '' }: Props) {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  const handlePress = () => {
    action()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClosed={onClose}
      swipeToClose
      propagateSwipe
      position='bottom'
      backdrop
      style={{ ...styles.container, height, padding: 12, marginBottom: 12 }}
      useNativeDriver
    >
      <View style={{ height: height - (insets.bottom + 12 || 24), justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: colors.card, borderRadius: 12 }}>
          <View style={{ minHeight: 72, borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: 16, alignItems: 'center' }}>
            {renderBefore}
            {!!title && <Typography style={styles.text} variant='h4'>{title}</Typography>}
            {!!body && <Typography color='secondary' style={{ ...styles.text, marginTop: !!title ? 12 : 0 }} variant='subtitle'>{body}</Typography>}
          </View>
          <DefaultButton size='l' labelStyle={{ color: severity === 'error' ? colors.error : colors.primary }} title='Confirm' onPress={handlePress} />
        </View>
        <View style={{ backgroundColor: colors.card, borderRadius: 12, marginTop: 12, justifyContent: 'center' }}>
          <DefaultButton labelStyle={{ color: colors.text }} title='Cancel' onPress={onClose} size='l' />
        </View>
      </View>
    </Modal >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: Constants.Theme.shape.MODAL,
    borderTopRightRadius: Constants.Theme.shape.MODAL,
  },

  text: {
    textAlign: 'center'
  },
})
