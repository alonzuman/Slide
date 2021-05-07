import { Request } from './API'

export default {
  getUserByID: async (userID: string) => {
    try {
      const data = await Request('GET', `/users/${userID}`)

      return data
    } catch (error) {
      console.log(error)
    }
  },

  followUser: async (currentUserID: string, remoteUserID: string) => {
    try {
      const res = await Request('POST', `/users/${remoteUserID}/follow`, {
        byUserID: currentUserID,
        userID: remoteUserID,
      })

      return res;
    } catch (error) {
      console.log(error)
    }
  },

  unfollowUser: async (currentUserID: string, remoteUserID: string) => {
    try {
      await Request('POST', `/users/${remoteUserID}/unfollow`, {
        byUserID: currentUserID,
        userID: remoteUserID
      })

    } catch (error) {
      console.log(error)
    }
  },

  getUserByStreamID: async (streamID: number) => {
    try {
      const data = await Request('GET', `/users/${streamID}/streamID`)
      return data;
    } catch (error) {
      console.log(error)
    }
  },

  getUserFollowing: async (userID: string) => {
    try {
      const data = await Request('GET', `users/${userID}/following`)
      return data
    } catch (error) {
      console.log(error)
      return null;
    }
  },

  getUserFollowers: async (userID: string) => {
    try {
      const data = await Request('GET', `users/${userID}/followers`)
      return data
    } catch (error) {
      console.log(error)
      return null;
    }
  },

  getLiveUserFollowing: async (userID: string) => {
    try {
      const data = await Request('GET', `users/${userID}/liveFollowing`)
      return data;
    } catch (error) {
      console.log(error)
      return null;
    }
  },

  getUsersByName: async ({ query, isFollowing = false }: { query: string, isFollowing: boolean }) => {
    const data = await Request('GET', `users?query=${query}&isFollowing=${isFollowing}`)
    return data;
  },

  blockUser: async (userID:string) => {
    const data = await Request('POST', `users/${userID}/block`)
    return data;
  },

  unblockUser: async (userID:string) => {
    const data = await Request('POST', `users/${userID}/unblock`)
    return data;
  },
}
