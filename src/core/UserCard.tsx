import React from 'react'
import { useNavigation } from "@react-navigation/core"
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { useTheme } from "../hooks/useTheme"
import { useUser } from "../hooks/useUser"
import ProfileFollowButton from "../scenes/Profile/ProfileFollowButton"
import Avatar from "./Avatar"
import Typography from "./Typography"

const CARD_WIDTH = 164

type Props = {
  avatar: string | '',
  name: string,
  style?: ViewStyle,
  userID: string,
  followers: number,
  onPress?: Function
}

export default function UserCard({ avatar, name, style, followers, userID, onPress }: Props) {
  const { user } = useUser()
  const { colors } = useTheme()
  const isMe = userID === user?._id

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={.8}>
      <View style={{ ...styles.container, backgroundColor: colors.cardAlt, ...style }}>
        <Avatar size='xl' uri={avatar} />
        <Typography style={styles.name} variant='h4'>{name}</Typography>
        <Typography style={styles.followers} variant='subtitle' color='secondary'>{followers} Followers</Typography>
        {isMe && <View style={{ ...styles.followButton, height: 32 }} />}
        {!isMe && <ProfileFollowButton style={styles.followButton} name={name} avatar={avatar} userID={userID} />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingTop: 24,
    padding: 12,
    width: CARD_WIDTH,
    borderRadius: 12,
    alignItems: 'center',
  },

  name: {
    marginTop: 12,
    fontWeight: '700'
  },

  followers: {
    marginTop: 4,
    marginBottom: 12
  },

  followButton: {
    width: 144
  }
})
