import { useNavigation, } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react'
import { useTheme } from './useTheme';

type Props = {

}

export default function useScreenOptions(options: Props) {
  const { colors, type } = useTheme()
  const { setOptions } = useNavigation()

  useLayoutEffect(() => {
    setOptions({
      headerStyle: {
        backgroundColor: colors.background,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        }
      },
      ...options,
    })
  }, [setOptions, type])

  return null;
}
