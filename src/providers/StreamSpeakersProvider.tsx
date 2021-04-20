import React, { createContext, useEffect, useState } from 'react'
import API from '../API/API'
import useStreamMeta from '../hooks/useStreamMeta'
import { useStreamProvider } from '../hooks/useStreamProvider'
import { useUser } from '../hooks/useUser'

export const StreamSpeakersContext = createContext()

export default function StreamSpeakersProvider({ children }) {
  const { engine } = useStreamProvider()
  const { user } = useUser()
  const { setMeta } = useStreamMeta()
  const [store, setStore] = useState({
    activeSpeaker: null,
    speakers: [],
    audioMuted: [],
    videoMuted: []
  })
  const { speakers, audioMuted, videoMuted, activeSpeaker } = store

  useEffect(() => {
    if (speakers?.length === 1) {
      setActiveSpeaker(speakers?.[0]?.streamID)
    }
  }, [speakers?.length])

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

    // _engine?.addListener('LocalVideoStateChanged', (state) => dispatch(speakerVideoStateUpdated({ speakerID: user?.streamID, isMuted: state === 0 })))
    // _engine?.addListener('RemoteVideoStateChanged', (speakerID, state) => dispatch(speakerVideoStateUpdated({ speakerID, isMuted: state === 0 })))
    // _engine?.addListener('RemoteVideoStateChanged', (speakerID, state) => console.log('VIDEO CHANGED', speakerID, state))
    // _engine?.addListener('RemoteAudioStateChanged', (speakerID, state) => dispatch(speakerAudioStateUpdated({ speakerID, isMuted: state === 0 })))
    // _engine?.addListener('RemoteAudioStateChanged', (speakerID, state) => console.log('Audio CHANGED', speakerID, state))
  }

  const speakerJoined = async (speakerID: string) => {
    const speaker = await API.Users.getUserByStreamID(speakerID)
    const updatedSpeakers = speakers?.find(v => v?._id === speaker?._id) ? speakers : [...speakers, speaker]
    setStore({
      ...store,
      speakers: updatedSpeakers
    })
  }

  const speakerLeft = async (speakerID: string) => {
    const updatedSpeakers = speakers?.filter(v => v?.streamID === speakerID)
    setStore({ ...store, speakers: updatedSpeakers })
  }

  const joinedStream = async (streamID: string) => {
    const { onStage, meta } = await API.Streams.getStreamByID(streamID)
    const isSpeaker = onStage?.includes(user?._id)
    const updatedSpeakers = isSpeaker ? [...speakers, user] : speakers

    setMeta({
      meta,
      streamID
    })
    setStore({
      ...store,
      streamID,
      onStage,
      speakers: updatedSpeakers
    })
  }

  const leftStream = () => {
    engine?.removeAllListeners()
  }

  const setActiveSpeaker = (streamID: number) => {
    setStore({ ...store, activeSpeaker: streamID })
  }

  return (
    <StreamSpeakersContext.Provider
      value={{
        speakers,
        audioMuted,
        videoMuted,
        activeSpeaker,
      }}
    >
      {children}
    </StreamSpeakersContext.Provider>
  )
}
