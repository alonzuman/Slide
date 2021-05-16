import React from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import HeaderLeft from "../../core/HeaderLeft";
import Typography from "../../core/Typography";
import { useEvent } from "../../hooks/useEvents";
import useScreenOptions from "../../hooks/useScreenOptions";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../hooks/useTheme";
import PrimaryButton from "../../core/PrimaryButton";

const HEADER_HEIGHT = 160;

export default function Event({ route }) {
  const { eventID } = route.params;
  const { event, isLoading, refetchEvent } = useEvent(eventID);
  const { colors } = useTheme();

  console.log({ eventID });

  useScreenOptions({
    headerTransparent: true,
    headerLeft: () => <HeaderLeft mode="modal" />,
    headerRight: () => (
      <PrimaryButton style={{ marginRight: 12 }} size="s" title="Subscribe" />
    ),
    headerTitle: "",
  });

  if (isLoading) return <ActivityIndicator style={{ marginTop: 80 }} />;

  return (
    <>
      <ParallaxScrollView
        parallaxHeaderHeight={HEADER_HEIGHT}
        contentBackgroundColor={colors.background}
        renderBackground={() =>
          !!event?.meta?.imageURL ? (
            <ImageBackground
              source={{ uri: event?.meta?.imageURL }}
              style={styles.cover}
            >
              <LinearGradient
                colors={[
                  colors.background,
                  `${colors.background}99`,
                  `${colors.background}50`,
                  "transparent",
                  `${colors.background}25`,
                  colors.background,
                ]}
                style={styles.overlay}
              />
            </ImageBackground>
          ) : (
            <LinearGradient
              colors={[
                colors.background,
                colors.background,
                colors.background,
                colors.background,
              ]}
              style={styles.overlay}
            />
          )
        }
      >
        <View style={styles.body}>
          <Typography variant="h1">{event?.meta?.name}</Typography>
          <Typography variant="h3">About</Typography>
          <Typography variant="body" color="secondary">
            {event?.meta?.description}
          </Typography>
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: HEADER_HEIGHT,
  },

  cover: {
    height: HEADER_HEIGHT,
    width: "100%",
  },

  body: {
    marginTop: -32,
    paddingHorizontal: 12,
  },
});
