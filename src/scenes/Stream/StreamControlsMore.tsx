import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Constants from "../../constants/Constants";
import AvatarsGroup from "../../core/AvatarsGroup";
import Chip from "../../core/Chip";
import DefaultButton from "../../core/DefaultButton";
import useModal from "../../hooks/useModal";
import {
  useStreamAudience,
  useStreamID,
  useStreamMeta,
} from "../../hooks/useStream";
import { useTheme } from "../../hooks/useTheme";

export default function StreamControlsMore() {
  const audience = useStreamAudience();
  const meta = useStreamMeta();
  const streamID = useStreamID();
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const { openModal, closeModal } = useModal();

  const handleMorePress = () => {
    openModal({
      renderBefore: (
        <AvatarsGroup
          borderColor="#fff"
          style={{ marginTop: 12 }}
          users={audience}
          max={2}
        />
      ),
      title: meta?.name,
      renderAfter: (
        <DefaultButton
          onPress={() => {
            navigate("Feedback", {
              type: Constants.FeedbackTypes.REPORT_STREAM,
              entityID: streamID,
              headerTitle: `Report ${meta?.name}`,
            });
            closeModal();
          }}
          size="l"
          labelStyle={{ color: colors.error }}
          title="Report"
        />
      ),
      type: "GENERAL/SELECT",
    });
  };

  return (
    <TouchableOpacity
      style={{ marginHorizontal: 12 }}
      onPress={handleMorePress}
    >
      <MaterialIcons name="more-horiz" size={24} color="#fff" />
    </TouchableOpacity>
  );
}
