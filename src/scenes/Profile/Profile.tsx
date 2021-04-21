import React from 'react'
import { StyleSheet } from 'react-native'
import { UserProfile } from '../../types'
import ProfileBio from './ProfileBio'
import ProfileFollowButton from './ProfileFollowButton'
import ProfileHeader from './ProfileHeader'
import ProfileInterests from './ProfileInterests'
import ProfileNomination from './ProfileNomination'
import ProfileStats from './ProfileStats'

export default function Profile({ name, _id, avatar, followers, following, bio, createdAt, invite, interests, isMe = false }: UserProfile) {
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
      <ProfileBio
        bio={bio}
        isMe={isMe}
      />
      <ProfileInterests
        isMe={isMe}
        interests={interests}
      />
      <ProfileNomination
        nomination={invite}
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
