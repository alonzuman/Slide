import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { Contact } from 'react-native-contacts'
import Avatar from '../../core/Avatar'
import DefaultButton from '../../core/DefaultButton'
import Header from '../../core/Header'
import HeaderLeft from '../../core/HeaderLeft'
import ListItem from '../../core/ListItem'
import PrimaryButton from '../../core/PrimaryButton'
import SearchField from '../../core/SearchField'
import SecondaryButton from '../../core/SecondaryButton'
import useInvites from '../../hooks/useInvites'
import { useUser } from '../../hooks/useUser'

export default function InviteFriends() {
  const { setOptions, push } = useNavigation()
  const { user } = useUser()
  const { setKeyword, keyword, isLoaded, isLoading, contacts, myInvites, fetchContacts, sendInvite } = useInvites()
  const canInvite = user?.invites > 0;

  useEffect(() => {
    console.log({ isLoaded })
    if (!isLoaded) {
      fetchContacts()
    }
  }, [])

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => <HeaderLeft mode='modal' />,
      headerTitle: '',
      headerShown: true
    })
  }, [setOptions])

  return (
    <>
      <Header
        disableMarginTop
        title={`${user?.invites} invites remaining`}
        subtitle='Do you have any friends that you think are a great potential for our community? invite them over!'
      />
      <DefaultButton
        title={`Invites sent (${myInvites?.length})`}
        onPress={() => push('Invites Sent')}
      />
      <SearchField
        placeholder='Search contact by name'
        style={{ margin: 12 }}
        value={keyword}
        onChangeText={v => setKeyword(v)}
      />
      <ScrollView>
        {isLoading && <ActivityIndicator style={{ marginTop: 12 }} />}
        {!isLoading && contacts
          ?.filter(v => {
            const fullName = `${v?.givenName} ${v?.familyName}`
            return fullName?.toLowerCase()?.includes(keyword?.toLowerCase())
          })
          ?.slice(0, 30)
          ?.map(({ givenName, familyName, recordID, thumbnailPath, phoneNumbers }: Contact) => {
            const isInvited = !!myInvites?.find(v => v?.recordID === recordID)
            // const isInvited = myInvites?.find(invite => invite?.recordID === recordID);
            const isFulfilled = myInvites?.find(invite => invite?.recordID === recordID)?.fulfilled;

            const handleInvitePress = () => sendInvite({
              name: `${givenName} ${familyName}`,
              recordID,
              avatar: thumbnailPath,
              phoneNumbers: phoneNumbers,
            })

            const _renderAction = () => {
              if (!canInvite) return null;
              if (isInvited) return <SecondaryButton title='Invited' size='s' />
              if (!isInvited) return <PrimaryButton size='s' onPress={handleInvitePress} title='Invite' />
            }

            return (
              <ListItem
                key={recordID}
                renderBefore={<Avatar size='m' uri={thumbnailPath} />}
                primary={`${givenName} ${familyName}`}
                renderAfter={_renderAction()}
              />
          )
        })}
      </ScrollView>
    </>
  )
}
