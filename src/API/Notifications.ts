import { Request } from "./API"

export default {
  sendNotification: async (user: string, title: string, body: string, imageUrl?: string, key?: string) => {
    await Request('POST', '/notifications', {
      user,
      title,
      body,
      imageUrl,
      key
    })
  },

  getMyNotifications: async () => {
    const data = await Request('GET', '/notifications')
    return data;
  },

  markMyNotificationsAsRead: async () => {
    const data = await Request('PUT', '/notifications')
    return data;
  }
}
