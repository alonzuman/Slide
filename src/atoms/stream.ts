import { atom, atomFamily, selectorFamily } from 'recoil'
import API from '../API/API'
import { UserProfile } from '../types'

export const streamMembersState = atom({
  key: 'streamMembers',
  default: [] as string[]
})

export const streamMetaState = atom({
  key: 'streamMeta',
  default: {
    name: '',
    description: '',
    streamID: '',
    imageURL: ''
  }
})

export const streamAudienceState = atom({
  key: 'streamAudience',
  default: [] as UserProfile[]
})

export const streamSpeakersState = atom({
  key: 'streamSpeakers',
  default: [] as number[]
})

export const streamSpeakerSelector = selectorFamily({
  key: 'streamSpeaker',
  get: (speakerID: number) => async ({ get }) => {
    const data = await API.Users.getUserByStreamID(speakerID)
    return data;
  }
})
