export const initialState = {
  socket: null,
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
  onStage: []
}

export const SET_ROLE = 'STREAM/SET_ROLE';
export const SET_SOCKET = 'STREAM/SET_SOCKET';
export const CLEAR_SOCKET = 'STREAM/CLEAR_SOCKET';
export const STREAM_UPDATED = 'STREAM/STREAM_UPDATED';
export const JOINED_STREAM = 'STREAM/JOINED_STREAM';
export const LEFT_STREAM = 'STREAM/LEFT_STREAM';

export default function (state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ROLE: return {
      ...state,
      role: payload
    }
    case SET_SOCKET: return {
      ...state,
      socket: payload
    }
    case CLEAR_SOCKET: return {
      ...state,
      socket: null
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
    case LEFT_STREAM: return initialState
    default: return state;
  }
}
