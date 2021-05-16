import { useEffect } from "react";
import { useQuery } from "react-query";
import API from "../API/API";

const REFETCH_INTERVAL = 30000;

export default function useStreams() {
  const { data: streams, isLoading, refetch: refetchStreams } = useQuery(
    "streams",
    API.Streams.fetchLiveStreams,
    {
      refetchInterval: REFETCH_INTERVAL,
    }
  );

  return { streams, isLoading, refetchStreams };
}
