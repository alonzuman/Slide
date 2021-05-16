import { Request } from "./API";

export default {
  getMyEvents: async () => {
    const data = await Request("GET", "/events");
    return data;
  },

  createEvent: async (event) => {
    const data = await Request("POST", "/events", { event });
    return data;
  },

  getEventByID: async (eventID: string) => {
    const data = await Request("GET", `/events/${eventID}`);
    return data;
  },
};
