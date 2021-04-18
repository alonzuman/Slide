import { StreamInvite } from '../constants/Types';
import { Request } from './API'

export default {
  fetchLiveStreams: async () => {
    const data = await Request('GET', '/streams/live')
    return data;
  },

  createStream: async (stream: object) => {
    const data = await Request('POST', '/streams/create', { stream })
    return data;
  },

  getStreamToken: async (streamID: string) => {
    const data = await Request('GET', `/streams/${streamID}/token`)
    return data;
  },

  getStreamByID: async (streamID: string) => {
    const data = await Request('GET', `/streams/${streamID}/get`)
    return data;
  },

  sendStreamInvite: async (streamID: string, invite: StreamInvite) => {
    const data = await Request('POST', `/streams/${streamID}/invite`, { invite })
    return data;
  },

  joinStream: async (streamID: string) => {
    const data = await Request('PUT', `/streams/${streamID}/join`)
    return data;
  },

  leaveStream: async (streamID: string) => {
    await Request('PUT', `/streams/${streamID}/leave`)
  },

  updateStream: async (streamID: string, data: object) => {
    await Request('PUT', `/streams/${streamID}`, { ...data })
  },

  updateGuests: async (streamID: string, guests: string[]) => {
    await Request('PUT', `/streams/${streamID}/guests`, { guests })
  },
}
