import React, { useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import Slider from '../../core/Slider'
import Typography from '../../core/Typography'
import useStream from '../../hooks/useStream'
import { useTheme } from '../../hooks/useTheme'
import { useUser } from '../../hooks/useUser'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DefaultButton from '../../core/DefaultButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CONTAINER_HEIGHT = 144
const CONTENT_MARGIN = 12

export default function StreamFiltersModal() {
  const { updateBeautyOptions } = useStream()
  const { user, isUpdating } = useUser()
  const [selected, setSelected] = useState('')
  const [streamConfig, setStreamConfig] = useState(user?.config?.stream || {})
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  const handleCancel = () => {
    setStreamConfig(user?.config?.stream)
    setSelected('')
  }

  const handleSave = async () => {
    await updateBeautyOptions(streamConfig)
    setSelected('')
  }

  const handleSlide = async (key: string, value: number) => setStreamConfig({
    ...user?.config?.stream,
    [key]: value
  })

  const iconProps = { size: 32, color: colors.text }

  const options = [
    {
      name: 'Contrast',
      key: 'lighteningContrastLevel',
      icon: <Ionicons name='md-contrast-sharp' {...iconProps} />
    },
    {
      name: 'Brightness',
      key: 'lighteningLevel',
      icon: <Entypo name='light-up' {...iconProps} />
    },
    {
      name: 'Warmth',
      key: 'rednessLevel',
      icon: <Entypo name='thermometer' {...iconProps} />
    },
    {
      name: 'Smoothness',
      key: 'smoothnessLevel',
      icon: <Entypo name='brush' {...iconProps} />
    },
  ]

  return (
    <View style={styles.container}>
      {!selected ? (
        <FlatList
          horizontal
          data={options}
          keyExtractor={item => item.key}
          renderItem={({ item: { icon, key, name } }) => (
            <TouchableOpacity style={styles.option} onPress={() => setSelected(key)}>
              <Typography variant='subtitle' style={styles.optionTitle}>{name}</Typography>
              <View
                style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: colors.border,
                  height: 64,
                  width: 64,
                  borderRadius: 32,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                {icon}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <>
          <Typography variant='h4' style={styles.sliderTitle}>{options?.find(v => v?.key === selected)?.name}</Typography>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={streamConfig?.[selected] || 0}
            onSlidingComplete={v => handleSlide(selected, v)}
          />
          <View style={{ ...styles.footer, marginBottom: insets.bottom || 12 }}>
            <DefaultButton disabled={isUpdating} onPress={handleCancel} labelStyle={{ color: colors.textAlt }} title='Cancel' />
            <DefaultButton disabled={isUpdating} isLoading={isUpdating} onPress={handleSave} title='Done' />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    paddingTop: 8,
  },

  option: {
    alignItems: 'center',
    padding: 12,
  },

  optionTitle: {
    marginBottom: 8
  },

  sliderTitle: {
    alignSelf: 'center'
  },

  slider: {
    // flex: 1,
    marginTop: CONTENT_MARGIN,
    marginBottom: CONTENT_MARGIN,
    marginHorizontal: 24,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
})
