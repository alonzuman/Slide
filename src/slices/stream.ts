import { createSlice } from "@reduxjs/toolkit";
import API from "../API/API";
import { Stream } from "../types";

const initialState = {
  streamID: '',
  activeSpeaker: null,
  meta: {
    name: '',
    description: '',
    imageURL: ''
  },
  members: [],
  audience: [],
  onStage: [],
  raisedHands: [],
  speakers: [],
  owners: [],
  audioMuted: [],
  videoMuted: [],
  isLive: false,
  isJoined: false,
  openModal: ''
} as Stream

const stream = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    joinedStream: (state, action) => {
      const { streamID, isLive, raisedHands, owners, meta, onStage } = action.payload
      state.streamID = streamID
      state.raisedHands = raisedHands
      state.owners = owners
      state.meta = meta
      state.onStage = onStage
      state.isLive = isLive
      state.isJoined = true;
    },

    membersUpdated: (state, action) => {
      const { members, audience } = action.payload
      state.members = members;
      state.audience = audience
    },

    _speakerJoined: (state, action) => {
      const { speaker } = action.payload
      const isSpeaker = state.speakers?.find(v => v?._id === speaker?._id)

      if (!isSpeaker) {
        state.speakers?.push(speaker)
      }
    },

    _speakerLeft: (state, action) => {
      const { speaker } = action.payload
      state.speakers = state?.speakers?.filter(v => v?._id !== speaker?._id)
    },

    speakerVideoStateUpdated: (state, action) => {
      const { speakerID, isMuted } = action.payload;
      if (!isMuted) {
        state.videoMuted = state.videoMuted.filter(v => v !== speakerID)
      } else {
        state.videoMuted.push(speakerID)
      }
    },

    speakerAudioStateUpdated: (state, action) => {
      const { speakerID, isMuted } = action.payload;
      if (!isMuted) {
        state.audioMuted = state.audioMuted.filter(v => v !== speakerID)
      } else {
        state.audioMuted.push(speakerID)
      }
    },

    streamUpdated: (state, action) => {
      Object.keys(action.payload)?.forEach(key => {
        state[key] = action.payload[key]
      })
    },

    leftStream: () => {
      return initialState
    }
  }
})

export const {
  joinedStream,
  membersUpdated,
  _speakerJoined,
  _speakerLeft,
  speakerAudioStateUpdated,
  speakerVideoStateUpdated,
  streamUpdated,
  leftStream
} = stream.actions


export const joinStream = ({ streamID }: { streamID: string }) => async dispatch => {
  const stream = await API.Streams.getStreamByID(streamID)
  dispatch(joinedStream({ ...stream, streamID }))
}

export const speakerJoined = ({ speakerID }: { speakerID: number }) => async dispatch => {
  const speaker = await API.Users.getUserByStreamID(speakerID)
  dispatch(_speakerJoined({ speaker }))
}

export const speakerLeft = ({ speakerID }: { speakerID: number }) => async dispatch => {
  const speaker = await API.Users.getUserByStreamID(speakerID)
  dispatch(_speakerLeft({ speaker }))
}

export default stream.reducer
