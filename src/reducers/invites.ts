import { Contact } from "react-native-contacts";
import { Invite } from "../types";

export const SET_INVITING = 'INVITES/SET_INVITING';
export const SET_LOADING = 'INVITES/SET_LOADING';
export const SET_CONTACTS = 'INVITES/SET_CONTACTS';
export const SET_KEYWORD = 'INVITES/SET_KEYWORD';

type State = {
  keyword: string,
  invites: Invite[],
  contacts: Contact[],
  isLoading: boolean,
  isLoaded: boolean,
  isInviting: boolean
}

export const initialState: State = {
  isLoading: false,
  isInviting: false,
  isLoaded: false,
  keyword: '',
  invites: [],
  contacts: [],
}

export default function (state: State, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_KEYWORD: return {
      ...state,
      keyword: payload
    }
    case SET_INVITING: return {
      ...state,
      isInviting: !state.isInviting
    }
    case SET_LOADING: return {
      ...state,
      isLoading: true
    }
    case SET_CONTACTS: return {
      ...state,
      contacts: payload,
      isLoading: false,
      isLoaded: true,
    }
    default: return state;
  }
}
