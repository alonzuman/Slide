import React from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import globals from "../globals";
import AvatarsGroup from "./AvatarsGroup";
import Typography from "./Typography";

const WIDTH = Dimensions.get("window").width / 2 - 20;
const HEIGHT = WIDTH * 1.5;

export default function CardStream({ onPress, meta, members, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{ ...styles.container, ...style }}
    >
      <Image source={{ uri: meta?.imageURL }} style={styles.image} />
      <AvatarsGroup
        size="s"
        style={styles.avatars}
        users={members}
        max={2}
        borderColor="#fff"
      />
      <View style={styles.overlay} />
      <Typography style={globals.textShadow} variant="h3">
        {meta?.name}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: HEIGHT,
    width: WIDTH,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "space-between",
    padding: 8,
  },

  avatars: {
    alignSelf: "flex-end",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000020",
  },

  image: {
    ...StyleSheet.absoluteFillObject,
  },
});
