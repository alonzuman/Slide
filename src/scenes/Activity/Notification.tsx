import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useNotifications from '../../hooks/useNotifications'
import { useTheme } from '../../hooks/useTheme'
import Avatar from '../../core/Avatar'
import ListItem from '../../core/ListItem'

export default function Notification() {
  const { activeNotification, clearActiveNotification } = useNotifications()
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  useEffect(() => {
    if (activeNotification) {
      setTimeout(() => {
        clearActiveNotification()
      }, 5000);
    }
  }, [activeNotification])

  if (!activeNotification) return null;

  return (
    <View style={{ ...styles.container, marginTop: insets.top }}>
      <ListItem
        onPress={clearActiveNotification}
        style={{ backgroundColor: colors.cardAlt, borderRadius: 12, }}
        primary={activeNotification?.title}
        secondary={activeNotification?.body}
        renderBefore={activeNotification?.imageURL && (
          <Avatar uri={activeNotification?.imageURL} size='m' />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 12,
    left: 12,
    zIndex: 99,
  }
})
