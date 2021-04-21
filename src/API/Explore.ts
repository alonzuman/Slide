import { Request } from "./API";

const Explore = {
  getSearchResults: async ({ queryKey: [key, keyword] }) => {
    const data = await Request('GET', `/explore/search?query=${keyword}`)
    return data;
  }
}

export default Explore;
