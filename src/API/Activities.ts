import { Activity } from "../constants/Types"
import { Request } from "./API"

const Activities = {
  trackActivity: async (activity: Activity) => {
    await Request('POST', '/activities', activity)
  },
}

export default Activities
