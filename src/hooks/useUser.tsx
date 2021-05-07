import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import API from "../API/API";

export const useUser = () => {
  const queryClient = useQueryClient();
  const { data: user, isLoading, refetch: refetchUser } = useQuery(
    "user",
    API.Me.getMyUser
  );
  const { mutate: updateUser, isLoading: isUpdating } = useMutation(
    API.Me.updateMyUser,
    {
      onSuccess: () => queryClient.invalidateQueries("user"),
    }
  );

  // const { mutate: optUpdateUser } = useMutation(API.Me.updateMyUser, {
  //   onMutate: (data) => {
  //     console.log('MUTATED')
  //     // Cancel any outgoing refetches so they wont overwrite the existing optimistic update value
  //     queryClient.cancelQueries('user')

  //     queryClient.setQueryData('user', oldData => {...old, ...data})
  //     console.log(data)
  //   },
  // })

  return { user, isLoading, isUpdating, updateUser, refetchUser };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation(
    API.Me.updateMyUser,
    {
      onSuccess: () => queryClient.invalidateQueries("user"),
    }
  );

  return { updateUser, isUpdating };
};

export const useUserID = () => {
  const { data: user } = useQuery("user", API.Me.getMyUser);
  return user?._id;
};

export const useUserName = () => {
  const { data: user } = useQuery("user", API.Me.getMyUser);
  return user?.name;
};

export const useUserStreamID = () => {
  const { data: user } = useQuery("user", API.Me.getMyUser);
  return user?.streamID;
};

export const useUserConfig = () => {
  const { data: user } = useQuery("user", API.Me.getMyUser);
  return user?.config;
}
