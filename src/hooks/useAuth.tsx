import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthStackProvider'

export type Fields =
  'phoneNumber' |
  'uniqueCode' |
  'confirmationCode' |
  'error' |
  'confirmationResult' |
  'isLoading' |
  'countryCode' |
  'isLocaleModalOpen';

type State = {
  updateField: (field: Fields, value: any) => void
  isLocaleModalOpen: boolean
  isLoading: boolean
  error?: string
  phoneNumber?: string
  confirmationCode?: string
  confirmationResult?: any
  countryCode?: string
}

export default function useAuth() {
  return useContext(AuthContext) as State
}
