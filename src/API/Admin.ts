import { Request } from './API'

export default {
  getUserActivities: async () => {
    const data = await Request('GET', '/activities')
    return data;
  },

  getUserInvites: async () => {
    const data = await Request('GET', '/admin/invites')
    return data;
  }
}
