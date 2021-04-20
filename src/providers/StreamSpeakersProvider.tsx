import React, { createContext, useEffect, useReducer, useState } from 'react'
import API from '../API/API'
import useStreamMeta from '../hooks/useStreamMeta'
import { useStreamProvider } from '../hooks/useStreamProvider'
import { useUser } from '../hooks/useUser'

export const StreamSpeakersContext = createContext()

export default function StreamSpeakersProvider({ children }) {
  const { engine } = useStreamProvider()
  const { setMeta } = useStreamMeta()
  const { user } = useUser()
  const [state, dispatch] = useReducer(speakersReducer, initialState)

  useEffect(() => {
    if (state?.speakers?.length === 1) {
      setActiveSpeaker(state?.speakers?.[0]?.streamID)
    }
  }, [state?.speakers])

  useEffect(() => {
    _applyListeners()
  }, [])

  const _applyListeners = async () => {
    console.log('Initializing engine listeners...')

    engine?.addListener('UserJoined', async (speakerID) => await speakerJoined(speakerID))
    engine?.addListener('UserOffline', async (speakerID) => await speakerLeft(speakerID))
    engine?.addListener('JoinChannelSuccess', async (streamID) => await joinedStream(streamID))
    engine?.addListener('LeaveChannel', (stats) => leftStream())
    engine?.addListener('ActiveSpeaker', (speakerID) => setActiveSpeaker(speakerID))
    engine?.addListener('LocalVideoStateChanged', (newState) => speakerStateChanged(user?.streamID, newState, 'VIDEO'))
    engine?.addListener('LocalAudioStateChanged', (newState) => speakerStateChanged(user?.streamID, newState, 'AUDIO'))
    engine?.addListener('RemoteVideoStateChanged', (speakerID, newState) => speakerStateChanged(speakerID, newState, 'VIDEO'))
    engine?.addListener('RemoteAudioStateChanged', (speakerID, newState) => speakerStateChanged(speakerID, newState, 'AUDIO'))
    engine?.addListener('ClientRoleChanged', (oldRole, newRole) => {
      const isSpeaker = newRole === 1
      if (isSpeaker) {
        speakerJoined(user?.streamID)
      } else {
        speakerLeft(user?.streamID)
      }
    })
  }

  const speakerJoined = async (speakerID: string) => {
    const speaker = await API.Users.getUserByStreamID(speakerID)
    dispatch({
      type: SPEAKER_JOINED,
      payload: speaker
    })
  }

  const speakerLeft = async (speakerID: string) => {
    dispatch({
      type: SPEAKER_LEFT,
      payload: speakerID
    })
  }

  const joinedStream = async (streamID: string) => {
    const { meta } = await API.Streams.getStreamByID(streamID)

    setMeta({
      meta,
      streamID
    })
  }

  const leftStream = () => {
    dispatch({ type: LEFT_STREAM })
    engine?.removeAllListeners()
  }

  const setActiveSpeaker = (streamID: number) => {
    dispatch({
      type: ACTIVE_SPEAKER_UPDATED,
      payload: streamID
    })
  }

  const speakerStateChanged = (speakerID: number, newState: number, type: 'AUDIO' | 'VIDEO') => {
    console.log('state changed', type, speakerID)
    dispatch({
      type: type === 'AUDIO' ? SPEAKER_AUDIO_STATE_CHANGED : SPEAKER_VIDEO_STATE_CHANGED,
      payload: { speakerID, newState, type }
    })
  }

  return (
    <StreamSpeakersContext.Provider
      value={{
        speakers: state.speakers,
        audioMuted: state.audioMuted,
        videoMuted: state.videoMuted,
        activeSpeaker: state.activeSpeaker,
        speakerJoined,
        speakerLeft,
        setActiveSpeaker,
      }}
    >
      {children}
    </StreamSpeakersContext.Provider>
  )
}

const speakersReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
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

const initialState = {
  speakers: [],
  audioMuted: [],
  videoMuted: [],
  activeSpeaker: null
}

const SPEAKER_JOINED = 'SPEAKERS_PROVIDER/SPEAKER_JOINED';
const SPEAKER_LEFT = 'SPEAKERS_PROVIDER/SPEAKER_LEFT';
const ACTIVE_SPEAKER_UPDATED = 'SPEAKERS_PROVIDER/ACTIVE_SPEAKER_UPDATED';
const SPEAKER_AUDIO_STATE_CHANGED = 'SPEAKERS_PROVIDER/SPEAKER_AUDIO_STATE_CHANGED';
const SPEAKER_VIDEO_STATE_CHANGED = 'SPEAKERS_PROVIDER/SPEAKER_VIDEO_STATE_CHANGED';
const LEFT_STREAM = 'SPEAKERS_PROVIDER/LEFT_STREAM';
