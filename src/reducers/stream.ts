import RtcEngine, { ClientRole } from "react-native-agora";
import { Socket } from "socket.io-client";
import { UserProfile } from "../types";

type State = {
  streamID: string
  isJoined: boolean
  isLive: boolean
  meta: {
    name: string
    description: string
    imageURL: string
  }
  invites: string[]
  members: string[]
  owners: string[]
  raisedHands: string[]
  onStage: number[]
  speakers: number[]
  audience: UserProfile[]
  audioMuted: number[]
  videoMuted: number[]
  activeSpeaker: number
  role: ClientRole
}

export const initialState: State = {
  socket: null,
  engine: null,
  streamID: '',
  isJoined: false,
  isLive: true,
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
  isJoinedSpeakers: false,
  activeSpeaker: null,
  role: null
}

export const SPEAKER_JOINED = 'STREAM/SPEAKER_JOINED';
export const SPEAKER_LEFT = 'STREAM/SPEAKER_LEFT';
export const ACTIVE_SPEAKER_UPDATED = 'STREAM/ACTIVE_SPEAKER_UPDATED';
export const SPEAKER_AUDIO_STATE_CHANGED = 'STREAM/SPEAKER_AUDIO_STATE_CHANGED';
export const SPEAKER_VIDEO_STATE_CHANGED = 'STREAM/SPEAKER_VIDEO_STATE_CHANGED';
export const SET_ROLE = 'STREAM/SET_ROLE';
export const STREAM_UPDATED = 'STREAM/STREAM_UPDATED';
export const JOINED_STREAM = 'STREAM/JOINED_STREAM';
export const LEFT_STREAM = 'STREAM/LEFT_STREAM';

export default function (state: State, action): State {
  const { type, payload } = action;

  switch (type) {
    case SET_ROLE: return {
      ...state,
      role: payload
    }
    case JOINED_STREAM: {
      return {
        ...state,
        ...payload,
        isJoined: true,
        streamID: payload?._id
      }
    }
    case STREAM_UPDATED: return {
      ...state,
      ...payload,
      streamID: payload?._id
    }
    case SPEAKER_JOINED: return {
      ...state,
      speakers: state.speakers?.find(v => v?.streamID === payload?.streamID) ? [...state.speakers] : [...state.speakers, payload]
    }
    case SPEAKER_LEFT: return {
      ...state,
      speakers: state?.speakers?.filter(v => v?.streamID !== payload)
    }
    case ACTIVE_SPEAKER_UPDATED: return {
      ...state,
      activeSpeaker: payload
    }
    case SPEAKER_AUDIO_STATE_CHANGED: {
      const { newState, speakerID } = payload;
      const isMuted = newState === 0
      return {
        ...state,
        audioMuted: isMuted ? [...state?.audioMuted, speakerID] : [...state?.audioMuted?.filter(v => v !== speakerID)]
      }
    }
    case SPEAKER_VIDEO_STATE_CHANGED: {
      const { newState, speakerID } = payload;
      const isMuted = newState === 0
      return {
        ...state,
        videoMuted: isMuted ? [...state?.videoMuted, speakerID] : [...state?.videoMuted?.filter(v => v !== speakerID)]
      }
    }
    case LEFT_STREAM: return initialState
    default: return state;
  }
}
