import React, { useContext } from 'react'
import { StreamMembersContext } from '../providers/StreamProvider'
import { useAppSelector } from '../store'
import { UserProfile } from '../types'

export default function useStream() {
  return useContext(StreamMembersContext)
}

export const useStreamMeta = () => useAppSelector(state => state.stream.meta)
export const useStreamSpeakers = () => useAppSelector(state => state.stream.speakers)
export const useStreamSpeaker = (speakerID: number) => useAppSelector(state => state.stream.speakers?.find(speaker => speaker.streamID === speakerID))
export const useStreamMembers = () => useAppSelector(state => state.stream.members)
export const useStreamAudience = () => useAppSelector(state => state.stream.audience)
export const useStreamAudienceMember = (userID: string) => useAppSelector(state => state.stream.audience?.find(audience => audience?._id === userID)) as UserProfile
export const useStreamActiveSpeaker = () => useAppSelector(state => state.stream.activeSpeaker)
export const useStreamRole = () => useAppSelector(state => state.stream.role)
export const useStreamOnStage = () => useAppSelector(state => state.stream.onStage)
export const useStreamOwners = () => useAppSelector(state => state.stream.owners)
export const useStreamInvites = () => useAppSelector(state => state.stream.invites)
export const useStreamRaisedHands = () => useAppSelector(state => state.stream.raisedHands)
export const useStreamID = () => useAppSelector(state => state.stream.streamID)
export const useStreamIsJoined = () => useAppSelector(state => state.stream.isJoined)
export const useStreamVideoMuted = () => useAppSelector(state => state.stream.videoMuted)
export const useStreamVideoMutedSpeaker = (speakerID: number) => useAppSelector(state => state.stream.videoMuted?.includes(speakerID))
export const useStreamAudioMuted = () => useAppSelector(state => state.stream.audioMuted)
export const useStreamAudioMutedSpeaker = (speakerID: number) => useAppSelector(state => state.stream.audioMuted?.includes(speakerID))
export const useStreamIsLive = () => useAppSelector(state => state.stream.isLive)
