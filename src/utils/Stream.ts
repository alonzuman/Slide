import { ErrorCode, WarningCode } from "react-native-agora"

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
      case 8: return 'View is invalid, please try reconnecting to stream...'
      case 16: return 'Failed to initialize video, please try reconnecting to stream...'
      case 106: return 'Poor network connection...'
      case 1051: return ''
      default: return ''
    }
  }
}
