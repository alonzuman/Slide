import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import storage from '@react-native-firebase/storage'
import { launchImageLibrary } from 'react-native-image-picker';

type Props = {
  children?: any
  isActive: boolean
  path: string
  onFinish?: any
  style?: object
  maxHeight?: number | null
  maxWidth?: number | null
  component?: Element
  setIsUploading?: Function
  overlayStyle?: ViewStyle
}

export default function FileUploader({
  component,
  overlayStyle,
  setIsUploading,
  children,
  maxHeight = 256,
  maxWidth = 256,
  style,
  isActive,
  path,
  onFinish }: Props) {
  const [isLoading, setIsLoading] = useState(null)
  const ref = storage().ref(path)

  const handlePress = () => {
    launchImageLibrary({
      mediaType: 'photo',
      maxWidth,
      maxHeight,
    }, async ({ uri }) => {
      if (!uri) return null
      setIsLoading(true)
      setIsUploading?.(true)
      await ref.putFile(uri)
      const res = await ref.getDownloadURL()
      setIsUploading?.(false)
      onFinish?.(res)
      setIsLoading(false)
    })
  }

  if (!isActive) return children

  if (component) {
    return (
      <TouchableOpacity
        activeOpacity={.8}
        onPress={handlePress}
      >
        {component}
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      style={{
        position: 'relative',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style
      }}
      activeOpacity={.8}
      onPress={handlePress}
    >
      {isLoading && (
        <>
          <View style={{ ...styles.spinnerContainer, ...overlayStyle }} />
          <ActivityIndicator color={'#fff'} style={styles.spinner} />
        </>
      )}
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  spinnerContainer: {
    backgroundColor: '#00000050',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 8,
  },

  spinner: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 9
  }
})
