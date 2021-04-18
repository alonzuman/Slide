import { Request } from "./API"

export default {
  getMyEvents: async () => {
    const data = await Request('GET', 'events')
    return data;
  },

  createEvent: async (event) => {
    console.log('creating', event)
  }
}
