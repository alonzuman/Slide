import React, { createContext, useReducer } from 'react'
import { Fields } from '../hooks/useAuth'
import authReducer, { initialState, SET_FIELD } from '../reducers/auth'

export const AuthContext = createContext()

export default function AuthProvider({ children }: { children: any }) {
  const [{
    isLoading,
    phoneNumber,
    uniqueCode,
    countryCode,
    confirmationResult,
    confirmationCode,
    error,
    isLocaleModalOpen
  }, dispatch] = useReducer(authReducer, initialState)

  const updateField = (field: Fields, value: string) => {
    if (field !== 'error') {
      dispatch({
        type: SET_FIELD,
        payload: { field: 'error', value: '' }
      })
    }

    dispatch({
      type: SET_FIELD,
      payload: { field, value }
    })
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        phoneNumber,
        uniqueCode,
        countryCode,
        confirmationCode,
        confirmationResult,
        error,
        isLocaleModalOpen,
        updateField,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
