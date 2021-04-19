import React, { useState } from 'react'
import { ViewStyle } from 'react-native'
import { useDispatch } from 'react-redux'
import API from '../../API/API'
import PrimaryButton from '../../core/PrimaryButton'
import SecondaryButton from '../../core/SecondaryButton'
import { useUser } from '../../hooks/useUser'
import { refreshMyUser } from '../../slices/user'

export default function ProfileFollowButton({ userID, style }: { userID: string, style: ViewStyle }) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: user } = useUser()
  const isMe = userID === user?._id
  const isFollowing = user?.following?.includes(userID)
  const dispatch = useDispatch()

  const follow = async () => {
    setIsLoading(true)
    await API.Users.followUser(user?._id, userID)
    await dispatch(refreshMyUser())
    setIsLoading(false)
  }

  const unfollow = async () => {
    setIsLoading(true)
    await API.Users.unfollowUser(user?._id, userID)
    await dispatch(refreshMyUser())
    setIsLoading(false)
  }

  if (isMe) return null;

  return (
    <>
      {isFollowing ? (
        <SecondaryButton
          isLoading={isLoading}
          style={style}
          size='s'
          title='Following'
          onPress={unfollow}
        />
      ) : (
        <PrimaryButton
          isLoading={isLoading}
          style={style}
          size='s'
          title='Follow'
          onPress={follow}
        />
      )}
    </>
  )
}
