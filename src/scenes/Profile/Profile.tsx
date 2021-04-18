import React from 'react'
import { StyleSheet } from 'react-native'
import { UserProfile } from '../../types'
import ProfileFollowButton from './ProfileFollowButton'
import ProfileHeader from './ProfileHeader'
import ProfileStats from './ProfileStats'

export default function Profile({ name, _id, avatar, followers, following, bio, createdAt, }: UserProfile) {
  return (
    <>
      <ProfileHeader
        name={name}
        avatar={avatar}
        createdAt={createdAt}
      />
      <ProfileFollowButton
        style={styles.followButton}
        userID={_id}
      />
      <ProfileStats
        userID={_id}
        followers={followers}
        following={following}
      />
    </>
  )
}

const styles = StyleSheet.create({
  followButton: {
    margin: 12,
    width: 144,
    alignSelf: 'center'
  }
})
