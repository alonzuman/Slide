import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native'
import Avatar from '../../core/Avatar'
import Typography from '../../core/Typography'
import { formatDistance } from 'date-fns'
import FileUploader from '../../core/FileUploader'
import { useUser } from '../../hooks/useUser'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import IconButton from '../../core/IconButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from '../../hooks/useTheme'
import BlurWrapper from '../../core/BlurWrapper'
import useScreenOptions from '../../hooks/useScreenOptions'
import useModal from '../../hooks/useModal'
import Constants from '../../constants/Constants'
import DefaultButton from '../../core/DefaultButton'
import API from '../../API/API'

type Props = {
  avatar: string
  name: string
  isMe: boolean
  createdAt?: string
  userID: string
}

export default function ProfileHeader({ userID, avatar, name, isMe, createdAt }: Props) {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false)
  const { updateUser, user, refetchUser, isLoading } = useUser()
  const { push, navigate } = useNavigation()
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  const { openModal, closeModal } = useModal()
  const isBlocked = user?.blocked?.includes(userID)

  const options = [
    {
      primary: isBlocked ? `Unblock ${name}` : `Block ${name}`,
      onPress: async () => {
        if (isBlocked) {
          await API.Users.unblockUser(userID)
        } else {
          await API.Users.blockUser(userID)
        }
        await refetchUser()
        closeModal()
      }
    },
    {
      primary: `Report ${name}`,
      onPress: () => {
        navigate('Feedback', {
          type: Constants.FeedbackTypes.REPORT,
          entityID: userID,
          headerTitle: `Report ${name}`
        })
        closeModal()
      }
    }
  ]

  const handleMorePress = () => {
    openModal({
      renderAfter: (
        <>
          {options?.map(({ primary, onPress }, index) => (
            <DefaultButton
              key={primary}
              onPress={onPress}
              style={{ ...styles.option, borderBottomWidth: 0, borderTopColor: index !== 0 ? colors.border : 'transparent' }}
              disabled={isLoading}
              isLoading={isLoading}
              size='l'
              labelStyle={{ color: colors.error }}
              title={primary}
            />
          ))}
        </>
      ),
      type: 'GENERAL/SELECT'
    })
  }

  useScreenOptions({
    headerRight: () => !isMe ? (
      <TouchableOpacity style={styles.headerRight} onPress={handleMorePress}>
        <MaterialIcons name='more-horiz' size={24} color={colors.text} />
      </TouchableOpacity>
    ) : null
  })

  return (
    <>
      <View style={styles.container}>
        {isMe ? (
          <FileUploader
            onFinish={(downloadURL: string) => updateUser({ avatar: downloadURL })}
            path={`/avatars/${user?._id}`}
            isActive={isMe}
            style={styles.avatar}
            overlayStyle={{ borderRadius: 100 }}
          >
            <Avatar style={styles.avatar} uri={avatar} size='xxl' />
          </FileUploader>
        ) : (
          <TouchableOpacity activeOpacity={.8} onPress={() => setIsAvatarOpen(true)}>
            <Avatar style={styles.avatar} uri={avatar} size='xxl' />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={.8}
          onPress={() => isMe ? push('Edit Field', { field: 'name', oldValue: user?.name, isRequired: true, placeholder: 'Your full name' }) : null}
        >
          <Typography style={styles.name} variant='h2'>{name}</Typography>
        </TouchableOpacity>
        {!!createdAt && <Typography variant='subtitle' color='secondary'>Joined {formatDistance(Date.parse(createdAt), Date.now())} ago</Typography>}
      </View>
      <Modal
        visible={isAvatarOpen}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setIsAvatarOpen(false)}
      >
        <BlurWrapper style={styles.modalContainer}>
          <IconButton style={{ ...styles.modalIconButton, top: insets.top || 12 }} onPress={() => setIsAvatarOpen(false)}>
            <MaterialCommunityIcons name='close' size={24} color={colors.text} />
          </IconButton>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: avatar }}
              style={styles.modalAvatar}
            />
          </View>
        </BlurWrapper>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 12
  },

  avatar: {
    marginBottom: 8
  },

  name: {
    marginBottom: 4
  },

  modalContainer: {
    flex: 1,
    padding: 12
  },

  modalContent: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },

  modalIconButton: {
    alignSelf: 'flex-end'
  },

  modalAvatar: {
    height: 240,
    width: 240,
    borderRadius: 104,
    alignSelf: 'center'
  },

  headerRight: {
    marginRight: 16,
  },

  option: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
  }
})
