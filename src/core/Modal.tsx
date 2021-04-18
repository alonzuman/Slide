import React, { ReactElement } from 'react'
import { View, ScrollView, TouchableHighlight, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import Modal from 'react-native-modalbox'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../hooks/useTheme'
import ModalNotch from './ModalNotch'
import Typography from './Typography'

type Props = {
  isOpen: boolean
  onClose: Function
  height?: number
  title?: string
  footer?: ReactElement
  children?: ReactElement | null
  position?: 'bottom' | 'center' | 'top'
}

export default function ({ isOpen, onClose, height = 320, title, footer, children, position = 'bottom' }: Props) {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <Modal
      isOpen={isOpen}
      onClosed={onClose}
      swipeToClose
      propagateSwipe
      position={position}
      backdrop
      style={{ ...styles.container, height }}
      useNativeDriver
    >
      <View style={{ ...styles.content, height, backgroundColor: colors.cardAlt }}>
        <View style={{ ...styles.header, borderBottomWidth: !!title ? 1 : 0, borderBottomColor: colors.border }}>
          <ModalNotch />
          {!!title && <Typography style={styles.headerTitle} variant='h4'>{title}</Typography>}
        </View>
        <ScrollView>
          <TouchableHighlight>
            <TouchableWithoutFeedback>
              <View>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </TouchableHighlight >
        </ScrollView >
        {!!footer && (
          <View style={{ ...styles.footer, borderBottomColor: colors.border, paddingBottom: insets.bottom || 12 }}>
            {footer}
          </View>
        )}
      </View >
    </Modal >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  content: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  header: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: 12,
  },

  headerTitle: {
    marginTop: 8,
    marginBottom: 12,
    textAlign: 'center'
  },

  footer: {
    padding: 12,
    borderTopWidth: 1,
  }
})
