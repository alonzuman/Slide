import { Request } from "./API";

const Explore = {
  getPeopleToFollow: async () => {
    const data = await Request('GET', '/explore/people-to-follow')
    return data;
  },

  getSearchResults: async (query: string | undefined) => {
    const data = await Request('GET', `/explore/search?query=${query}`)
    return data;
  }
}

export default Explore;
