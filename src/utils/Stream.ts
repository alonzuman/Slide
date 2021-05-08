import { Dimensions } from "react-native"
import { ErrorCode, WarningCode } from "react-native-agora"
import Constants from '../constants/Constants'

export default {
  engineErrorMessage: (error: ErrorCode): string => {
    switch (error) {
      case 18: return 'You are already in this channel'
      case 18: return `You've already left the channel`
      default: return ''
    }
  },

  engineWarningMessage: (warning: WarningCode): string => {
    switch (warning) {
      // case 8: return 'View is invalid, please try reconnecting to stream...'
      case 106: return 'Poor network connection...'
      case 1051: return ''
      default: return ''
    }
  },

  getModalHeight: (modalType: string) => {
    switch (modalType) {
      case Constants.Modals.FILTERS: return 224
      case Constants.Modals.MORE: return 256;
      default: return Dimensions.get('window').height * .6
    }
  }
}
