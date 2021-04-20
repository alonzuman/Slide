import React, { useState } from 'react'
import { ViewStyle } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import API from '../../API/API'
import PrimaryButton from '../../core/PrimaryButton'
import SecondaryButton from '../../core/SecondaryButton'
import { useUser } from '../../hooks/useUser'

export default function ProfileFollowButton({ userID, style }: { userID: string, style: ViewStyle }) {
  // const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  const isMe = userID === user?._id
  const isFollowing = user?.following?.includes(userID)
  const queryClient = useQueryClient()

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
          onPress={handlePress}
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
