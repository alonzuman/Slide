import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import CardStream from "../../core/CardStream";
import EmptyState from "../../core/EmptyState";
import useStreams from "../../hooks/useStreams";

export default function HomeLiveStreams() {
  const { streams, refetchStreams, isLoading } = useStreams();
  const { push } = useNavigation();

  if (isLoading) return <ActivityIndicator style={{ marginTop: 12 }} />;

  if (!isLoading && streams?.length === 0)
    return (
      <EmptyState
        primary="Oh no 😥"
        secondary="It seems that there are no live stages at the moment."
      />
    );

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetchStreams} />
      }
      keyExtractor={(item) => item?._id}
      numColumns={2}
      data={streams}
      style={{ padding: 6 }}
      renderItem={({ item, index }) => (
        <CardStream
          style={{ margin: 6 }}
          onPress={() =>
            push("Stream", {
              screen: "Stream",
              params: { streamID: item?._id },
            })
          }
          key={item._id}
          {...item}
        />
      )}
    />
  );
}
