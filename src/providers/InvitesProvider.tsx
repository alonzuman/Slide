import React, { createContext, useReducer } from 'react'
import invitesReducer, { initialState, SET_CONTACTS, SET_INVITING, SET_KEYWORD, SET_LOADING } from '../reducers/invites'
import Contacts from 'react-native-contacts';
import { Alert, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import API from '../API/API';
import useModal from '../hooks/useModal';
import Constants from '../constants/Constants';
import ListItem from '../core/ListItem';
import { useTheme } from '../hooks/useTheme';
import utils from '../utils';
import SendSMS from 'react-native-sms'
import { useUser } from '../hooks/useUser';
import useSnackbar from '../hooks/useSnackbar';

export const InvitesContext = createContext()

export default function InvitesProvider({ children }: { children: any }) {
  const { colors } = useTheme()
  const [{ isLoading, isLoaded, isInviting, keyword, contacts }, dispatch] = useReducer(invitesReducer, initialState)
  const { data: myInvites, isLoading: isLoadingInvites, refetch: refetchMyInvites } = useQuery('my-invites', API.Invites.getMyInvites)
  const { openSnackbar } = useSnackbar()
  const { refetchUser } = useUser()
  const { openModal, closeModal } = useModal()

  const setIsInviting = () => dispatch({ type: SET_INVITING })
  const setIsLoading = () => dispatch({ type: SET_LOADING })

  const setKeyword = (newValue: string) => dispatch({ type: SET_KEYWORD, payload: newValue })

  const fetchContacts = async () => {
    setIsLoading()
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

    Contacts.getAll().then(res => dispatch({
      type: SET_CONTACTS,
      payload: res
    }))
  }

  const sendInvite = ({ recordID, name, phoneNumbers, avatar }) => {
    setIsInviting()

    // If phonenumebrs are bigger then one, a modal would open and ask for the client to choose
    // the phone number they wish to send the invitation to.
    if (phoneNumbers?.length > 1) {
      openModal({
        title: 'Pick phone number',
        body: 'Choose the phone number you wish to send the invitation to.',
        type: Constants.Modals.SELECT,
        renderAfter: phoneNumbers?.map(({ number, label }, index) => (
          <TouchableOpacity
            style={{ ...styles.option, borderTopWidth: 1, borderTopColor: index !== 0 ? colors.border : 'transparent' }}
            key={number}
            activeOpacity={.8}
            onPress={() => {
              createInviteAndSendSMS({ name, recordID, phoneNumber: number, avatar })
              closeModal()
            }}
          >
            <ListItem
              label={utils.General.capitalizeFirstLetter(label)}
              primary={number}
            />
          </TouchableOpacity>
        ))
      })
    } else {
      createInviteAndSendSMS({ name, recordID, phoneNumber: phoneNumbers?.[0]?.number, avatar })
    }
  }

  const createInviteAndSendSMS = async ({ recordID, avatar, name, phoneNumber }) => {
    // Create invite with a new invitation code
    const newInvite = await API.Invites.createInviteWithUniqueCode({
      avatar,
      name,
      recordID,
      phoneNumber
    })

    // Prepare message
    const message = {
      body: `Hey!👋 I have an invite for you to SlideTV and want you to join me there! Upon entry, make sure you use the code "${newInvite?.uniqueCode}" when first entering the app. Here is the link! IOS: https://testflight.apple.com/join/YvyZGQ38`,
      recipients: [phoneNumber],
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true
    }

    SendSMS?.send?.(message, async (completed, cancelled, err) => {
      console.log(completed, cancelled, err)

      if (err) {
        return openSnackbar({
          primary: 'Error',
          secondary: 'Failed to send invite, please try again later.',
          type: 'ERROR'
        })
      }

      if (completed) {
        await API.Invites.updateInviteByID({ ...newInvite, isSent: true })
        openSnackbar({
          primary: 'Invite sent!',
          type: 'SUCCESS'
        })
        refetchUser()
        return refetchMyInvites()
      }

      if (cancelled) {
        return openSnackbar({
          primary: 'Invite was not sent.',
          type: 'WARNING'
        })
      }
    })
  }

  return (
    <InvitesContext.Provider
      value={{
        isLoading,
        isLoaded,
        contacts,
        keyword,
        myInvites,
        isLoadingInvites,
        isInviting,
        refetchMyInvites,
        fetchContacts,
        sendInvite,
        setKeyword
      }}
    >
      {children}
    </InvitesContext.Provider>
  )
}

const styles = StyleSheet.create({
  option: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 72,
  }
})
