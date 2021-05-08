import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AvatarsGroup from "../../core/AvatarsGroup";
import ListItem from "../../core/ListItem";
import Typography from "../../core/Typography";
import useStream, {
  useStreamAudience,
  useStreamID,
  useStreamMembers,
  useStreamMeta,
  useStreamOwners,
} from "../../hooks/useStream";
import { useTheme } from "../../hooks/useTheme";
import useModal from "../../hooks/useModal";
import { useUser } from "../../hooks/useUser";
import DefaultButton from "../../core/DefaultButton";

export default function StreamWidget() {
  const { leaveStream, endStream } = useStream();
  const { colors } = useTheme();
  const { push } = useNavigation();
  const { openModal } = useModal();
  const meta = useStreamMeta();
  const streamID = useStreamID();
  const audience = useStreamAudience();
  const members = useStreamMembers();
  const owners = useStreamOwners();
  const { user } = useUser();
  const [isLeaving, setIsLeaving] = useState(false);
  const isOwner = owners?.includes(user?._id);

  const handlePress = () =>
    push("Stream", {
      screen: "Stream",
      params: { streamID },
    });

  const handleLeavePress = () => {
    if (isOwner) {
      return openModal({
        renderBefore: (
          <AvatarsGroup
            borderColor="#fff"
            users={audience}
            size="s"
            style={{ marginTop: 12 }}
          />
        ),
        body: "By leaving, you are permenantly closing this stream",
        type: "GENERAL/SELECT",
        severity: "error",
        action: async () => {
          setIsLeaving(true);
          await endStream();
          await leaveStream();
          return setIsLeaving(false);
        },
      });
    }

    leaveStream();
  };

  if (!streamID) return null;

  return (
    <ListItem
      style={{
        backgroundColor: colors.background,
        shadowColor: colors.secondaryDark,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
      }}
      onPress={handlePress}
      renderPrimary={<Typography variant="h4">{meta?.name}</Typography>}
      renderLabel={
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <AvatarsGroup
            style={{ marginRight: 4 }}
            showMore={false}
            onPress={handlePress}
            users={audience}
            size="xxs"
            borderColor="#fff"
          />
          {members?.length > 1 && (
            <Typography variant="subtitle" color="secondary">{`You and ${
              members?.length - 1
            } more`}</Typography>
          )}
        </View>
      }
      renderAfter={
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <DefaultButton
            labelStyle={{ color: colors.error }}
            size="s"
            title="✌️ Leave"
            onPress={handleLeavePress}
            isLoading={isLeaving}
          />
        </View>
      }
    />
  );
}
