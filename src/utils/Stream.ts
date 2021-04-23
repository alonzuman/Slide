export default {
  engineErrorMessage: (error) => {
    switch (error) {
      case 18: return `You've already left the channel`

    }
  },

  engineWarningMessage: (warning) => {
    switch (warning) {
      case 8: return 'View is invalid, please try reconnecting to stream...'
      case 16: return 'Failed to initialize video, please try reconnecting to stream...'
      case 106: return 'Poor network connection...'
      case 1051: return 'Audio feedback detected, please step away from devices that are also in this stream...'
    }
  }
}
