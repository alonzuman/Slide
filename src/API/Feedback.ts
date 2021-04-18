import { Request } from "./API";

const Feedback = {
  sendFeeback: async (feedback: object) => {
    const data = await Request('POST', '/feedback/', { content: feedback })
    return data;
  }
}

export default Feedback;
