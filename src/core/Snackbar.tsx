import React, { useEffect } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../hooks/useTheme'
import ListItem from './ListItem'

export default function Snackbar({ primary, secondary, type, clearSnackbar }) {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  // const bottom = useState(new Animated.Value(0))[0]

  const _renderIcon = () => {
    switch (type) {
      case 'WARNING': return <Ionicons name='warning-outline' color={colors.text} size={28} />
      case 'ERROR': return <MaterialIcons name='error-outline' color={colors.text} size={28} />
      case 'SUCCESS': return <Ionicons name='checkmark-circle-outline' size={28} color={colors.text} />
    }
  }

  // const slide = () => {
  //   Animated.spring(bottom, {
  //     toValue: !!primary ? 0 : -256,
  //     useNativeDriver: false
  //   }).start()
  // }

  useEffect(() => {
    // slide()

    if (primary) {
      setTimeout(() => {
        clearSnackbar()
      }, 3000);
    }
  }, [primary])

  if (!secondary) return null

  return (
    <Animated.View style={{ ...styles.container, zIndex: 999, bottom: insets.bottom }}>
      <ListItem
        onPress={clearSnackbar}
        style={{ backgroundColor: colors.cardAlt, borderRadius: 8 }}
        renderBefore={_renderIcon()}
        primary={primary}
        secondary={secondary}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 9999,
    padding: 12,
  },

  content: {
    borderRadius: 8,
    padding: 12
  },

  art: {
    marginRight: 4,
    marginLeft: -8
  }
})
