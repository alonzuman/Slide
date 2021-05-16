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

  sendStreamInvite: async (streamID: string, userID: string) => {
    const data = await Request('POST', `/streams/${streamID}/invite/${userID}`)
    return data;
  },
}
