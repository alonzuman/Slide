import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useQuery } from "react-query";
import API from "../../API/API";
import Avatar from "../../core/Avatar";
import Header from "../../core/Header";
import HeaderLeft from "../../core/HeaderLeft";
import ListItem from "../../core/ListItem";
import PrimaryButton from "../../core/PrimaryButton";
import SecondaryButton from "../../core/SecondaryButton";
import Typography from "../../core/Typography";
import useEventCreate from "../../hooks/useEventCreate";
import useScreenOptions from "../../hooks/useScreenOptions";
import { useUserID } from "../../hooks/useUser";

export default function EventCreateGuests() {
  const { updateField, state } = useEventCreate();
  const userID = useUserID();
  const { data: users, isLoading } = useQuery(["user-following", userID], () =>
    API.Users.getUserFollowing(userID)
  );

  useScreenOptions({
    headerTitle: "",
    headerLeft: () => <HeaderLeft />,
  });

  return (
    <>
      <Header
        title="Invite guests"
        subtitle="Guests will be have the permission to go on stage as soon as they join the stream."
        marginTop={12}
      />
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : (
        <FlatList
          keyExtractor={(item) => item._id}
          data={users}
          renderItem={({ item }) => {
            const isInvited = state?.guests?.find((v) => v?._id === item?._id);
            const handlePress = () => {
              if (isInvited) {
                updateField({
                  guests: state?.guests?.filter((v) => v?._id !== item?._id),
                });
              } else {
                updateField({ guests: [...state.guests, item] });
              }
            };

            return (
              <ListItem
                renderBefore={<Avatar size="s" uri={item?.avatar} />}
                primary={item.name}
                renderAfter={
                  isInvited ? (
                    <SecondaryButton
                      onPress={handlePress}
                      title="Cancel"
                      size="s"
                    />
                  ) : (
                    <PrimaryButton
                      onPress={handlePress}
                      title="Invite"
                      size="s"
                    />
                  )
                }
              />
            );
          }}
        />
      )}
    </>
  );
}
