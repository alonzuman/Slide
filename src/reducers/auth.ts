export const SET_LOADING = 'AUTH/SET_LOADING'
export const SET_FIELD = 'AUTH/SET_FIELD'

export const initialState = {
  isLoading: false,
  phoneNumber: '',
  countryCode: '+972',
  uniqueCode: '',
  confirmationCode: '',
  confirmationResult: null,
  isLocaleModalOpen: false,
  error: '',
}

export default function (state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FIELD: return {
      ...state,
      [payload.field]: payload.value
    }
    default: return state;
  }
}

