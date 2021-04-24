import { Invite } from "../types";
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

  updateInviteByID: async (invite: Invite) => {
    const data = await Request('PUT', `/invites/${invite?._id}`, { invite })
    return data;
  },

  inviteFriend: async ({ phoneNumber, avatar, name, recordID }: { phoneNumber: string, avatar: string, name: string, recordID: string }) => {
    const data = await Request('POST', '/invites', { phoneNumber, avatar, name, recordID })
    return data;
  }
}
