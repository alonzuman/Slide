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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import DefaultButton from '../../core/DefaultButton'
import API from '../../API/API'

const COVER_HEIGHT = 160

type Props = {
  isInStack: boolean
  isLoading: boolean
  isMe: boolean
}

export default function Profile({
  cover,
  name,
  _id,
  isInStack = false,
  isLoading = false,
  avatar,
  followers,
  following,
  bio,
  createdAt,
  invite,
  interests,
  isMe = false,
}: UserProfile & Props) {
  const { colors } = useTheme()
  const { user, updateUser, refetchUser, isLoading: isUserLoading } = useUser()
  const insets = useSafeAreaInsets()
  const isBlocked = user?.blocked?.includes(_id)

  const unblockUser = async () => {
    await API.Users.unblockUser(_id)
    await refetchUser()
  }

  if (isLoading) return <ActivityIndicator style={{ marginTop: insets.top + 64 }} />

  if (isBlocked) return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Typography style={{ marginBottom: 8 }} variant='h3'>You blocked this user</Typography>
      <Typography style={{ textAlign: 'center' }} variant='body' color='secondary'>You need to unblock this users in order to view this profile</Typography>
      <DefaultButton
        isLoading={isUserLoading}
        title='Unblock'
        onPress={unblockUser}
      />
    </SafeAreaView>
  )
  return (
    <ParallaxScrollView
      parallaxHeaderHeight={COVER_HEIGHT}
      contentBackgroundColor={colors.background}
      renderBackground={() => !!cover ? (
        <ImageBackground source={{ uri: cover }} style={styles.cover}>
          <LinearGradient colors={[colors.background, `${colors.background}50`, 'transparent', `${colors.background}25`, colors.background]} style={styles.overlay} />
        </ImageBackground>
      ) : (
        <LinearGradient colors={[colors.background, colors.background, colors.background, colors.background]} style={styles.overlay} />
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
          userID={_id}
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
          isInStack={isInStack}
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
          userID={_id}
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
    marginTop: -56
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
