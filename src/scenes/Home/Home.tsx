import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Typography from "../../core/Typography";
import useScreenOptions from "../../hooks/useScreenOptions";
import { useTheme } from "../../hooks/useTheme";
import EventCreateButton from "../Event/EventCreateButton";
import StreamStartButton from "../Stream/StreamStartButton";
import HomeLiveStreams from "./HomeLiveStreams";
import HomeEvents from "./HomeEvents";
import styles from "./styles";

export default function Home() {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);

  const headers = [
    { label: "Live", value: 0 },
    // TODO: uncomment this when is ready for prod
    // { label: "Upcoming", value: 1 },
  ];

  useScreenOptions(
    {
      headerLeft: () => (
        <View style={styles.header}>
          {headers?.map(({ label, value }) => {
            const isSelected = value === index;
            return (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                key={label}
                activeOpacity={0.8}
                onPress={() => setIndex(value)}
              >
                <Typography
                  variant="h2"
                  style={{
                    marginLeft: 12,
                    color: isSelected ? colors.text : `${colors.textAlt}50`,
                  }}
                >
                  {label}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      ),
      headerRight: () =>
        index === 0 ? (
          <StreamStartButton style={styles.headerRightButton} />
        ) : (
          <EventCreateButton style={styles.headerRightButton} />
        ),
      headerTitle: "",
    },
    [index]
  );

  return index === 0 ? <HomeLiveStreams /> : <HomeEvents />;
}
