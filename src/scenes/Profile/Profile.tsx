import React from 'react'
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { UserProfile } from '../../types'
import ProfileBio from './ProfileBio'
import ProfileFollowButton from './ProfileFollowButton'
import ProfileHeader from './ProfileHeader'
import ProfileInterests from './ProfileInterests'
import ProfileNomination from './ProfileNomination'
import ProfileStats from './ProfileStats'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { useTheme } from '../../hooks/useTheme'
import LinearGradient from 'react-native-linear-gradient'
import FileUploader from '../../core/FileUploader'
import Typography from '../../core/Typography'
import { useUser } from '../../hooks/useUser'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const COVER_HEIGHT = 256

export default function Profile({
  cover,
  name,
  _id,
  isLoading = false,
  avatar,
  followers,
  following,
  bio,
  createdAt,
  invite,
  interests,
  isMe = false,
}: UserProfile) {
  const { colors } = useTheme()
  const { user, updateUser } = useUser()
  const insets = useSafeAreaInsets()

  if (isLoading) return <ActivityIndicator style={{ marginTop: insets.top + 64 }} />

  return (
    <ParallaxScrollView
      parallaxHeaderHeight={COVER_HEIGHT}
      contentBackgroundColor={colors.background}
      renderBackground={() => !!cover ? (
        <ImageBackground source={{ uri: cover }} style={styles.cover}>
          <LinearGradient colors={['#000', '#00000099', 'transparent', 'transparent', colors.background]} style={styles.overlay} />
        </ImageBackground>
      ) : (
        <LinearGradient colors={['#000', colors.background, colors.background, colors.background]} style={styles.overlay} />
      )}
      renderForeground={() => (
        <FileUploader
          onFinish={(downloadURL: string) => updateUser({ cover: downloadURL })}
          path={`/covers/${user?._id}`}
          isActive={isMe}
          style={{ ...styles.cover }}
        >
          {!cover && isMe && !!createdAt && <Typography style={styles.headerText}>Press here to add a cover photo!</Typography>}
        </FileUploader>
      )}
    >
      <View style={styles.content}>
        <ProfileHeader
          isMe={isMe}
          name={name}
          avatar={avatar}
          createdAt={createdAt}
        />
        <ProfileFollowButton
          style={styles.followButton}
          name={name}
          avatar={avatar}
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
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  followButton: {
    margin: 12,
    width: 144,
    alignSelf: 'center'
  },

  content: {
    marginTop: -80
  },

  overlay: {
    height: COVER_HEIGHT,
  },

  cover: {
    height: COVER_HEIGHT,
    width: '100%',
  },

  headerText: {
    alignSelf: 'center',
    marginTop: 24
  }
})
