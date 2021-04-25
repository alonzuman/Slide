import { useNavigation, } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react'
import { useTheme } from './useTheme';

export default function useScreenOptions(options) {
  const { colors } = useTheme()
  const { setOptions } = useNavigation()

  useLayoutEffect(() => {
    setOptions({
      headerStyle: {
        backgroundColor: colors.cardMain,
        borderBottomColor: colors.border,
      },
      ...options,
    })
  }, [setOptions])

  return null;
}
