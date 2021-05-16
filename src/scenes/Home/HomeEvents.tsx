import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import CardEvent from "../../core/CardEvent";
import EmptyState from "../../core/EmptyState";
import Typography from "../../core/Typography";
import useEvents from "../../hooks/useEvents";

export default function HomeEvents() {
  const { push } = useNavigation();
  const { events, refetchEvents, isLoading } = useEvents();

  if (isLoading) return <ActivityIndicator style={{ marginTop: 12 }} />;

  if (!isLoading && events?.length == 0)
    return (
      <EmptyState
        primary="Oh no 😥"
        secondary="It seems that there are no upcoming events at the moment."
      />
    );

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetchEvents} />
      }
      style={{ padding: 12 }}
      data={events}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <CardEvent
          style={{ marginBottom: 12 }}
          onPress={() =>
            push("Event", {
              screen: "Event",
              params: { eventID: item?._id },
            })
          }
          {...item}
        />
      )}
    />
  );
}
