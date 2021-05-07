import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useStreamIsJoined } from "../../hooks/useStream";
import StreamLiveChip from "./StreamLiveChip";

export default function StreamHeaderRight() {
  const { goBack } = useNavigation();
  const isJoined = useStreamIsJoined();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {isJoined && <StreamLiveChip />}
      <TouchableOpacity onPress={goBack} style={{ marginRight: 12 }}>
        <Entypo name="chevron-down" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
