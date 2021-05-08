import React from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
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

export default function StreamModalMembers() {
  const meta = useStreamMeta();

  useScreenOptions({
    headerTitle: meta?.name,
    headerLeft: () => <HeaderLeft mode="modal" />,
  });

  return <Tabs />;
}

function Tabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "speakers", title: "Speakers 🎙️" },
    { key: "raisedHands", title: "Raised Hands ✋" },
    { key: "audience", title: "Audience 🧑‍🤝‍🧑" },
  ]);

  const renderScene = SceneMap({
    speakers: Speakers,
    raisedHands: RaisedHands,
    audience: Audience,
  });

  return (
    <TabView
      renderTabBar={_renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const _renderTabBar = (props: any) => {
  const { colors } = useTheme();

  // TODO: get the number of speakers, hands raised and audience shown on the tabs themselves
  return (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{ backgroundColor: colors.secondaryDark }}
      style={{ backgroundColor: colors.background }}
      getLabelText={({ route }) => (
        <Typography variant="subtitle">{route.title}</Typography>
      )}
    />
  );
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
