import { createSlice } from "@reduxjs/toolkit";
import { StreamState } from "../types";

export const initialState: StreamState = {
  isJoined: false,
  isLive: true,
  streamID: '',
  meta: {
    name: '',
    description: '',
    imageURL: ''
  },
  invites: [],
  audience: [],
  members: [],
  owners: [],
  raisedHands: [],
  onStage: [],
  speakers: [],
  audioMuted: [],
  videoMuted: [],
  activeSpeaker: null,
  role: null
}

const { actions, reducer } = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    joinedStream: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        streamID: payload?._id,
        isJoined: true
      }
    },
    leftStream: () => {
      return initialState
    },
    setRole: (state, { payload }) => {
      state.role = payload
    },
    speakerJoined: (state, { payload }) => {
      const isAlreadySpeaker = state.speakers?.find(v => v?.streamID === payload?.streamID)
      if (!isAlreadySpeaker) {
        state.speakers.push(payload)
      }
    },
    speakerLeft: (state, { payload }) => {
      state.speakers = state.speakers.filter(v => v.streamID !== payload)
    },
    speakerAudioStateChanged: (state, { payload }) => {
      const { newState, speakerID } = payload;
      const isMuted = newState === 0
      return {
        ...state,
        audioMuted: isMuted ? [...state?.audioMuted, speakerID] : [...state?.audioMuted?.filter(v => v !== speakerID)]
      }
    },
    speakerVideoStateChanged: (state, { payload }) => {
      const { newState, speakerID } = payload;
      const isMuted = newState === 0
      return {
        ...state,
        videoMuted: isMuted ? [...state?.videoMuted, speakerID] : [...state?.videoMuted?.filter(v => v !== speakerID)]
      }
    },
    activeSpeakerUpdated: (state, { payload }) => {
      state.activeSpeaker = payload
    },
    streamUpdated: (state, { payload }) => {
      Object.keys(payload)?.forEach(key => {
        state[key] = payload[key]
      })
    }
  }
})

export const {
  joinedStream,
  leftStream,
  setRole,
  speakerJoined,
  speakerLeft,
  speakerAudioStateChanged,
  speakerVideoStateChanged,
  activeSpeakerUpdated,
  streamUpdated,
} = actions;

export default reducer;
