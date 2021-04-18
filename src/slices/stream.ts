import { createSlice } from "@reduxjs/toolkit";
import { ClientRole } from "react-native-agora";
import API from "../API/API";
import { Stream } from "../types";

const initialState = {
  activeSpeaker: null,
  speakers: [],
  audience: [],
  audioMuted: [],
  videoMuted: [],
  raisedHands: [],
  guests: [],
  role: ClientRole.Audience,
  streamID: '',
  isJoined: false,
  isLowAudio: false,
  isAudioMuted: true,
  isVideoMuted: true,
  view: {
    isAudienceOpen: false,
    isOnStageOpen: false,
  }
} as Stream

const stream = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    updateStream: (state, action) => {
      Object.keys(action.payload)?.forEach(key => {
        state[key] = action.payload[key]
      })
    },

    updateView: (state, action) => {
      Object.keys(action.payload)?.forEach(key => {
        state.view[key] = action.payload[key]
      })
    },

    speakerJoined: (state, action) => {
      const isSpeaker = !!state.speakers?.find(v => v?.streamID === action.payload.streamID)
      const isAudience = !!state?.audience?.includes(action.payload?._id)

      if (isAudience) {
        state.audience = state.audience.filter(v => v !== action.payload?._id)
      }

      if (!isSpeaker) {
        state.speakers.push(action.payload)
      }
    },

    speakerLeft: (state, action) => {
      const { user } = action.payload;
      state.speakers = state.speakers?.filter(v => v?.streamID !== user?.streamID)
    },

    speakerAudioStateChanged: (state, action) => {
      const { streamID, newState }: { streamID: number, newState: number } = action.payload;
      const isAudioAlreadyMuted = state.audioMuted?.includes(streamID)
      const isMuted = newState === 0

      if (isMuted && !isAudioAlreadyMuted) {
        state.audioMuted.push(streamID)
      } else {
        state.audioMuted = state.audioMuted.filter(v => v !== streamID)
      }
    },

    speakerVideoStateChanged: (state, action) => {
      const { streamID, newState }: { streamID: number, newState: number } = action.payload;
      const isVideoAlreadyMuted = state.videoMuted?.includes(streamID)
      const isMuted = newState === 0

      if (isMuted && !isVideoAlreadyMuted) {
        state.videoMuted.push(streamID)
      } else {
        state.videoMuted = state.videoMuted.filter(v => v !== streamID)
      }
    },

    clearStream: () => {
      return initialState
    }
  }
})

export const {
  updateStream,
  updateView,
  speakerJoined: _speakerJoined,
  speakerLeft: _speakerLeft,
  speakerVideoStateChanged,
  speakerAudioStateChanged,
  clearStream,
} = stream.actions

export const joinStream = (streamID: string) => async dispatch => {
  const data = await API.Streams.joinStream(streamID)
  console.log('JOINED')
  dispatch(updateStream({ ...data, streamID, isJoined: true }))
}

export const leaveStream = (streamID: string) => async dispatch => {
  await API.Streams.leaveStream(streamID)
  dispatch(clearStream())
}

export const speakerJoined = (streamID: string) => async dispatch => {
  const user = await API.Users.getUserByStreamID(streamID)
  dispatch(_speakerJoined(user))
}

export const speakerLeft = (streamID: string, reason: number) => async dispatch => {
  const user = await API.Users.getUserByStreamID(streamID)
  dispatch(_speakerLeft({ user, reason }))
}

export const clientLeft = (streamID: string) => async dispatch => {
  console.log('CLIENT LEFT')
}

export const clientJoined = (streamID: string) => async dispatch => {
  console.log('CLIENT JOINED')
}

export default stream.reducer;
