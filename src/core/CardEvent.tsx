import { format } from "date-fns";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../hooks/useTheme";
import AvatarsGroup from "./AvatarsGroup";
import IconButton from "./IconButton";
import Typography from "./Typography";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CARD_HEIGHT = 256;

export default function CardEvent({
  _id,
  meta,
  owners,
  guests,
  subscribers,
  style,
  onPress,
}) {
  const { colors } = useTheme();
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      activeOpacity={.8}
      onPress={onPress}
    >
      <Image source={{ uri: meta?.imageURL }} style={styles.image} />
      <LinearGradient
        colors={[
          `${colors.background}99`,
          "transparent",
          "transparent",
          `${colors.background}99`,
        ]}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <AvatarsGroup
            users={[...owners, ...guests, ...subscribers]}
            borderColor="#fff"
            size="m"
          />
          <IconButton
            onPress={() => setIsSubscribed(!isSubscribed)}
            elevation={0}
            variant="blur"
          >
            <MaterialCommunityIcons
              name={`bell-${!isSubscribed ? "outline" : "ring"}`}
              size={24}
              color={!isSubscribed ? colors.textAlt : colors.text}
            />
          </IconButton>
        </View>
        <View>
          <Typography variant="h5">
            {format(new Date(Date.now()), "MMM do, yyyy")}
          </Typography>
          <Typography variant="h2">{meta?.name}</Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    position: "relative",
    height: CARD_HEIGHT,
    overflow: "hidden",
  },

  content: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },

  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
  },
});
