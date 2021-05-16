import React, { useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Chip from "../../core/Chip";
import EmptyState from "../../core/EmptyState";
import HeaderLeft from "../../core/HeaderLeft";
import Typography from "../../core/Typography";
import useScreenOptions from "../../hooks/useScreenOptions";
import {
  useStreamAudience,
  useStreamMeta,
  useStreamRaisedHands,
  useStreamSpeakers,
} from "../../hooks/useStream";
import { useTheme } from "../../hooks/useTheme";
import StreamMember from "./StreamMember";

const routes = [
  { value: "speakers", label: "Speakers" },
  { value: "raisedHands", label: "Raised Hands" },
  { value: "audience", label: "Audience" },
];

export default function StreamModalMembers() {
  const meta = useStreamMeta();

  useScreenOptions({
    headerTitle: meta?.name,
    headerLeft: () => <HeaderLeft mode="modal" />,
  });

  return <Tabs />;
}

function Tabs() {
  const [active, setActive] = useState("speakers");

  const renderScene = SceneMap({
    speakers: Speakers,
    raisedHands: RaisedHands,
    audience: Audience,
  });

  return (
    <>
      <View>
        <FlatList
          horizontal
          data={routes}
          keyExtractor={(item) => item.value}
          renderItem={({ item, index }) => (
            <Chip
              style={{ marginRight: 12, marginLeft: index === 0 ? 12 : 0 }}
              label={item.label}
              isSelected={active === item.value}
              onPress={() => setActive(item.value)}
            />
          )}
        />
      </View>
      <View style={{ flex: 1 }}>{_render(active)}</View>
    </>
  );
}

const _render = (active: string) => {
  switch (active) {
    case "speakers":
      return <Speakers />;
    case "raisedHands":
      return <RaisedHands />;
    case "audience":
      return <Audience />;
  }
};

const Speakers = () => {
  const speakers = useStreamSpeakers();
  return (
    <FlatList
      data={speakers}
      keyExtractor={(item) => item?._id}
      renderItem={({ item }) => (
        <StreamMember userID={item?._id} key={item?._id} />
      )}
    />
  );
};

const RaisedHands = () => {
  const raisedHands = useStreamRaisedHands();

  if (raisedHands?.length === 0)
    return <EmptyState secondary="No raised hands at the moment." />;

  return (
    <FlatList
      data={raisedHands}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <StreamMember userID={item} key={item} />}
    />
  );
};

const Audience = () => {
  const audience = useStreamAudience();

  return (
    <FlatList
      data={audience}
      keyExtractor={(item) => item?._id}
      renderItem={({ item }) => (
        <StreamMember userID={item?._id} key={item?._id} />
      )}
    />
  );
};
