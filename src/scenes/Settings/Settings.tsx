import React from 'react'
import { Linking, ScrollView } from 'react-native'
import DefaultButton from '../../core/DefaultButton'
import useModal from '../../hooks/useModal'
import Constants from '../../constants/Constants'
import Avatar from '../../core/Avatar'
import { useUser } from '../../hooks/useUser'
import useAuth from '../../hooks/useAuth'
import Section from '../../core/Section'
import { useTheme } from '../../hooks/useTheme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import ListItem from '../../core/ListItem'
import IconButton from '../../core/IconButton'
import { useNavigation } from '@react-navigation/core'
import Typography from '../../core/Typography'

export default function Settings() {
  const { signOut } = useAuth()
  const { openModal } = useModal()
  const { user } = useUser()
  const { colors } = useTheme()
  const { navigate } = useNavigation()

  // const toggleFeedback = () => null

  const handleLinkPress = async (url) => {
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      await Linking.openURL(url)
    } else {
      console.log("Link not supported")
    }
  }

  const handleSignOutPress = () => {
    openModal({
      renderBefore: <Avatar size='l' uri={user?.avatar} style={{ marginTop: 12 }} />,
      body: 'Are you sure you wish to sign out?',
      type: Constants.Modals.SELECT,
      action: signOut,
      severity: 'error'
    })
  }

  const menu = [
    {
      sectionTitle: 'General',
      options: [
        {
          optionTitle: 'Invite friends',
          optionIcon: <Ionicons name='person-add' size={18} color={colors.text} />,
          optionRenderAfter: <Typography variant='subtitle' color='secondary'>{user?.invites} invites left</Typography>,
          onPress: () => navigate('Invite Friends')
        },
        {
          optionTitle: 'Phone number',
          optionIcon: <Entypo name='phone' size={18} color={colors.text} />,
          optionRenderAfter: <Typography variant='subtitle' color='secondary'>{user?.phoneNumber}</Typography>,
        },
        // {
        //   optionTitle: 'Notifications',
        //   optionIcon: <MaterialCommunityIcons name='bell' size={18} color={colors.text} />,
        //   onPress: () => navigate('Notifications Settings'),
        // },
        // {
        //   optionTitle: 'Language Settings',
        //   optionIcon: <Ionicons name='language' size={18} color={colors.text} />,
        //   onPress: () => navigate('Language Settings'),
        // }
      ]
    },
    // {
    //   sectionTitle: 'Feedback',
    //   options: [
    //     {
    //       optionTitle: 'Send feedback',
    //       optionIcon: <Ionicons name='chatbubble-ellipses' size={18} color={colors.text} />,
    //       onPress: { toggleFeedback }
    //     }
    //   ]
    // },
    {
      sectionTitle: 'Information',
      options: [
        {
          optionTitle: 'Privacy Policy',
          optionIcon: <MaterialIcons name='policy' size={18} color={colors.text} />,
          onPress: () => handleLinkPress(Constants.URLs.PRIVACY_POLICY)
        },
        {
          optionTitle: 'Terms of Service',
          optionIcon: <Ionicons name='newspaper' size={18} color={colors.text} />,
          onPress: () => handleLinkPress(Constants.URLs.TERMS_OF_SERVICE)
        },
        {
          optionTitle: 'Support',
          optionIcon: <Ionicons name='help' size={18} color={colors.text} />,
          onPress: () => handleLinkPress(Constants.URLs.SUPPORT)
        },
      ]
    }
  ]

  return (
    <ScrollView>
      {menu?.map(({ sectionTitle, options }) => (
        <Section title={sectionTitle} key={sectionTitle}>
          {options?.map(({ optionTitle, optionRenderAfter, optionIcon, onPress }) => (
            <ListItem
              key={optionTitle}
              onPress={onPress}
              renderBefore={(
                <IconButton card elevation={0}>
                  {optionIcon}
                </IconButton>
              )}
              primary={optionTitle}
              renderAfter={optionRenderAfter}
            />
          ))}
        </Section>
      ))}
      <DefaultButton title='Sign out' onPress={handleSignOutPress} />
    </ScrollView>
  )
}
