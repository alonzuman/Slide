export const initialState = {
  engine: null,
  isJoinedSpeakers: false,
  speakers: [],
  audioMuted: [],
  videoMuted: [],
  activeSpeaker: null,
  role: null
}

export const SET_ENGINE = 'STREAM_SPEAKERS/SET_ENGINE';
export const JOINED_STREAM = 'STREAM_SPEAKERS/JOINED_STREAM';
export const SPEAKER_JOINED = 'STREAM_SPEAKERS/SPEAKER_JOINED';
export const SPEAKER_LEFT = 'STREAM_SPEAKERS/SPEAKER_LEFT';
export const ACTIVE_SPEAKER_UPDATED = 'STREAM_SPEAKERS/ACTIVE_SPEAKER_UPDATED';
export const SPEAKER_AUDIO_STATE_CHANGED = 'STREAM_SPEAKERS/SPEAKER_AUDIO_STATE_CHANGED';
export const SPEAKER_VIDEO_STATE_CHANGED = 'STREAM_SPEAKERS/SPEAKER_VIDEO_STATE_CHANGED';
export const LEFT_STREAM = 'STREAM_SPEAKERS/LEFT_STREAM';

export default function (state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ENGINE: return {
      ...state,
      engine: payload
    }
    case JOINED_STREAM: return {
      ...state,
      isJoinedSpeakers: true
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
