import React, { useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import API from "../../API/API";
import Avatar from "../../core/Avatar";
import DefaultButton from "../../core/DefaultButton";
import HeaderLeft from "../../core/HeaderLeft";
import ListItem from "../../core/ListItem";
import PrimaryButton from "../../core/PrimaryButton";
import SearchField from "../../core/SearchField";
import useScreenOptions from "../../hooks/useScreenOptions";
import useStream, { useStreamInvites } from "../../hooks/useStream";
import { useUser } from "../../hooks/useUser";

export default function StreamInvites() {
  const [keyword, setKeyword] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const { user } = useUser();
  const { data: users, isLoading } = useQuery(
    ["user-following", user?._id],
    () => API.Users.getUserFollowing(user?._id)
  );
  const { sendStreamInvite } = useStream();
  const invites = useStreamInvites();

  useScreenOptions({
    headerTitle: "Invite People Over 👋",
    headerLeft: () => <HeaderLeft mode="modal" />,
  });

  return (
    <>
      <SearchField
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Search by full name"
        style={{ margin: 12 }}
      />
      {isLoading && <ActivityIndicator style={{ marginTop: 24 }} />}
      {!isLoading && (
        <FlatList
          data={users?.filter((v) => v?.name?.includes(keyword))}
          keyExtractor={(item) => item?._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const { avatar, _id, name } = item;
            const isInvitedByCurrentUser = invites?.find(
              (v) => v?.byUser === user?._id && v?.user === _id
            );

            const _renderAction = () => {
              if (isInvitedByCurrentUser)
                return <DefaultButton title="Invited!" size="s" />;
              return (
                <PrimaryButton
                  size="s"
                  title="Invite"
                  isLoading={isInviting}
                  onPress={async () => {
                    setIsInviting(true);
                    await sendStreamInvite(_id);
                    setIsInviting(false);
                  }}
                />
              );
            };

            return (
              <ListItem
                key={_id}
                renderBefore={<Avatar size="m" uri={avatar} />}
                primary={name}
                renderAfter={_renderAction()}
              />
            );
          }}
        />
      )}
    </>
  );
}
