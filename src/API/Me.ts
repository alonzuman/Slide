import { Request } from "./API";

export default {
  getMyUser: async () => {
    const data = await Request('GET', '/me')
    return data;
  },

  updateMyUser: async (updatedFields: object) => {
    const data = await Request('PUT', '/me', updatedFields)
    return data;
  }
}
