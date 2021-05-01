import React, { createContext, useReducer } from 'react'
import invitesReducer, { initialState, SET_LOADING } from '../reducers/invites'
import Contacts from 'react-native-contacts';
import { PermissionsAndroid, Platform } from 'react-native';

export const InvitesContext = createContext()

export default function InvitesProvider({ children }: { children: any }) {
  const [{ isLoading, contacts, invites }, dispatch] = useReducer(invitesReducer, initialState)

  const setIsLoading = () => dispatch({ type: SET_LOADING })

  const fetchContacts = async () => {
    setIsLoading()
    console.log('Fetching contacts...')
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Contacts',
          'message': 'This app would like to view your contacts to allow you to send them invitations.',
          'buttonPositive': 'Accept'
        }
      )
    }
    Contacts.getAll().then(res => console.log(res))
  }

  return (
    <InvitesContext.Provider value={{ isLoading, contacts, invites, fetchContacts }}>
      {children}
    </InvitesContext.Provider>
  )
}
