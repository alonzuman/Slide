import { Request } from "./API"

export default {
  createInviteWithUniqueCode: async (invite: object) => {
    const data = await Request('POST', '/invites/new', { invite })
    return data;
  },

  approveUniqueCode: async (uniqueCode: string) => {
    const data = await Request('POST', '/invites/approve-code', { uniqueCode })
    return data;
  },

  getMyInvites: async () => {
    const data = await Request('GET', '/invites')
    return data;
  },

  inviteFriend: async ({ phoneNumber, avatar, name }: { phoneNumber: string, avatar: string, name: string }) => {
    const data = await Request('POST', '/invites', { phoneNumber, avatar, name })
    return data;
  }
}
