import React from "react";
import { ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import API from "../../API/API";
import Avatar from "../../core/Avatar";
import Typography from "../../core/Typography";
import useStreamLayout from "../../hooks/useStreamLayout";

export default function StreamModalProfilePreview() {
  const { params } = useStreamLayout();
  const { data: user, isLoading } = useQuery(["user", params?.userID], () =>
    API.Users.getUserByID(params?.userID)
  );

  if (isLoading) return <ActivityIndicator style={{ marginTop: 24 }} />;

  return (
    <>
      <Avatar uri={user?.avatar} />
      <Typography>{user?.name}</Typography>
      <Typography></Typography>
    </>
  );
}
