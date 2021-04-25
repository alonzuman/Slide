import { useNavigation, } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react'
import { useTheme } from './useTheme';

type Props = {

}

export default function useScreenOptions(options:Props) {
  const { colors } = useTheme()
  const { setOptions } = useNavigation()

  useLayoutEffect(() => {
    setOptions({
      headerStyle: {
        backgroundColor: colors.cardAlt,
        borderBottomColor: colors.border,
      },
      ...options,
    })
  }, [setOptions])

  return null;
}
