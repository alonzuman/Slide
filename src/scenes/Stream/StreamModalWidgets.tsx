import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Typography from "../../core/Typography";
import { useTheme } from "../../hooks/useTheme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StreamModalOptionWrapper from "./StreamModalOptionWrapper";

export default function StreamWidgetsModal() {
  const { colors } = useTheme();

  const iconProps = {
    size: 24,
    color: colors.text,
  };

  const options = [
    {
      name: "Note",
      icon: <MaterialCommunityIcons name="sticker-outline" {...iconProps} />,
      key: "stickyNote",
      onPress: () => null,
    },
    {
      name: "Poll",
      icon: <MaterialCommunityIcons name="poll" {...iconProps} />,
      key: "poll",
      onPress: () => null,
    },
  ];

  return (
    <FlatList
      data={options}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ paddingVertical: 12 }}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={{ marginLeft: index === 0 ? 12 : 0, marginRight: 12, alignItems: 'center' }}
          key={item.key}
          onPress={item.onPress}
        >
          <Typography variant='subtitle' color='secondary' style={{ marginBottom: 8 }}>{item.name}</Typography>
          <StreamModalOptionWrapper>{item.icon}</StreamModalOptionWrapper>
        </TouchableOpacity>
      )}
    />
  );
}
