import React, { useState } from 'react'
import { ViewStyle } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import API from '../../API/API'
import Constants from '../../constants/Constants'
import Avatar from '../../core/Avatar'
import PrimaryButton from '../../core/PrimaryButton'
import SecondaryButton from '../../core/SecondaryButton'
import useModal from '../../hooks/useModal'
import { useUser } from '../../hooks/useUser'

export default function ProfileFollowButton({ userID, name = 'this person', style, avatar }: { avatar?: string, name?: string, userID: string, style?: ViewStyle }) {
  const { openModal } = useModal()
  const { user } = useUser()
  const isMe = userID === user?._id
  const isFollowing = user?.following?.includes(userID)
  const queryClient = useQueryClient()

  const handleUnfollow = () => openModal({
    renderBefore: <Avatar uri={avatar} size='l' style={{ marginTop: 12 }} />,
    body: `Unfollow ${name}?`,
    type: Constants.Modals.SELECT,
    action: () => handlePress(),
    severity: 'error'
  })

  const { mutate: handlePress, isLoading } = useMutation(() => isFollowing ? API.Users.unfollowUser(user?._id, userID) : API.Users.followUser(user?._id, userID), {
    onSuccess: () => queryClient.invalidateQueries('user'),
  })

  if (isMe) return null;

  return (
    <>
      {isFollowing ? (
        <SecondaryButton
          isLoading={isLoading}
          style={style}
          size='s'
          title='Following'
          onPress={handleUnfollow}
        />
      ) : (
        <PrimaryButton
          isLoading={isLoading}
          style={style}
          size='s'
          title='Follow'
          onPress={handlePress}
        />
      )}
    </>
  )
}
