import { useQuery } from "react-query";
import API from "../API/API";

export default function useEvents() {
  const { data: events, isLoading, refetch: refetchEvents } = useQuery(
    "events",
    API.Events.getMyEvents
  );

  return { events, isLoading, refetchEvents };
}

export const useEvent = (eventID: string) => {
  const { data: event, isLoading, refetch: refetchEvent } = useQuery(
    ["event", eventID],
    () => API.Events.getEventByID(eventID)
  );

  return { event, isLoading, refetchEvent };
};
