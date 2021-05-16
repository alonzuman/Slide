import { useNavigation } from "@react-navigation/native";
import { formatDistance } from "date-fns/esm";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import API from "../../API/API";
import Avatar from "../../core/Avatar";
import EmptyState from "../../core/EmptyState";
import Header from "../../core/Header";
import ListItem from "../../core/ListItem";
import Typography from "../../core/Typography";
import useScreenOptions from "../../hooks/useScreenOptions";
import { useTheme } from "../../hooks/useTheme";

export default function Activity() {
  const queryClient = useQueryClient();
  const { push, navigate } = useNavigation();
  const { colors } = useTheme();
  const { data: notifications, isLoading, refetch } = useQuery(
    "notifications",
    API.Activity.getMyNotifications
  );
  useScreenOptions({
    headerTitle: "",
    headerLeft: () => (
      <Typography variant="h2" style={{ marginLeft: 12 }}>
        Activity
      </Typography>
    ),
  });

  const { mutate: markAsRead } = useMutation(
    API.Activity.markMyNotificationsAsRead,
    {
      onSuccess: () => queryClient.invalidateQueries("notifications"),
    }
  );

  useEffect(() => {
    setTimeout(() => {
      markAsRead();
    }, 3000);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {isLoading && <ActivityIndicator style={{ marginTop: 24 }} />}
      {!isLoading && notifications?.length === 0 && (
        <EmptyState secondary="No new activity 🤗" />
      )}
      {!isLoading &&
        notifications?.map((item) => {
          const isRead = item?.readAt;

          const handlePress = () => {
            markAsRead();
            switch (item?.type) {
              case "FOLLOW":
                return push("User Profile", { userID: item?.byUser?._id });
              case "STREAM_INVITE":
                return navigate("Stream", {
                  screen: "Stream",
                  params: { streamID: item?.linkID },
                });
            }
          };
          return (
            <ListItem
              key={item?._id}
              onPress={handlePress}
              renderBefore={<Avatar size="m" uri={item?.byUser?.avatar} />}
              renderPrimary={
                <View style={{ paddingRight: 12 }}>
                  <Typography variant="h4">{item?.body}</Typography>
                  <Typography
                    variant="subtitle"
                    color="secondary"
                  >{`${formatDistance(
                    Date.parse(item?.createdAt),
                    Date.now()
                  )} ago`}</Typography>
                </View>
              }
              renderAfter={
                <View style={{ position: "absolute", top: 8, right: 8 }}>
                  {!isRead && <ActivityUnreadMarker />}
                </View>
              }
            />
          );
        })}
    </ScrollView>
  );
}

const ActivityUnreadMarker = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        alignSelf: "flex-end",
        marginTop: 4,
        backgroundColor: colors.primary,
        height: 8,
        width: 8,
        borderRadius: 4,
      }}
    />
  );
};
