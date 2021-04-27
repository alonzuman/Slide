import React, { useContext } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { streamMetaState, streamMembersState, streamAudienceState, streamSpeakersState, streamSpeakerSelector } from '../atoms/stream'
import { StreamMembersContext } from '../providers/StreamProvider'

export default function useStream() {
  return useContext(StreamMembersContext)
}

export const useStreamMeta = () => useRecoilState(streamMetaState)
export const useSetStreamMeta = () => useSetRecoilState(streamMetaState)
export const useStreamMetaValue = () => useRecoilValue(streamMetaState)

export const useStreamMembers = () => useRecoilState(streamMembersState)
export const useSetStreamMembers = () => useSetRecoilState(streamMembersState)
export const useStreamMembersValue = () => useRecoilValue(streamMembersState)

export const useStreamAudience = () => useRecoilState(streamAudienceState)
export const useSetStreamAudience = () => useSetRecoilState(streamAudienceState)
export const useStreamAudienceValue = () => useRecoilValue(streamAudienceState)

export const useStreamSpeakers = () => useRecoilState(streamSpeakersState)

export const useStreamSpeakerValue = (speakerID: number) => useRecoilValue(streamSpeakerSelector(speakerID))
