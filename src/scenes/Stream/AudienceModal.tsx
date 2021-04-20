import React from 'react'
import Avatar from '../../core/Avatar'
import ListItem from '../../core/ListItem'
import PrimaryButton from '../../core/PrimaryButton'
import SecondaryButton from '../../core/SecondaryButton'
import useStreamMembers from '../../hooks/useStreamMembers'
import useStreamMeta from '../../hooks/useStreamMeta'
import { useStreamProvider } from '../../hooks/useStreamProvider'
import { useUser } from '../../hooks/useUser'
import ProfileFollowButton from '../Profile/ProfileFollowButton'

export default function AudienceModal() {
  const { audience, onStage, owners } = useStreamMembers()
  const { user } = useUser()
  const { streamID } = useStreamMeta()
  const { socket } = useStreamProvider()

  return (
    <>
      {audience?.map(({ avatar, name, _id }) => {
        const isOwner = owners?.includes(user?._id)
        const isSpeaker = onStage?.includes(_id)
        const isMe = _id === user?._id

        const makeSpeaker = () => {
          const updatedStage = [...onStage, _id]
          socket?.emit('update-stream', ({ streamID, onStage: updatedStage }))
        }

        const makeAudience = () => {
          const updatedStage = [...onStage?.filter(v => v !== _id)]
          socket?.emit('update-stream', ({ streamID, onStage: updatedStage }))
        }

        const _renderAction = () => {
          if (isMe) return null;
          if (isOwner) {
            return isSpeaker ? (
              <SecondaryButton
                size='s'
                title='Make Audience'
                onPress={makeAudience}
              />
            ) : (
              <PrimaryButton
                onPress={makeSpeaker}
                size='s'
                title='Make Speaker'
              />
            )
          }

          return <ProfileFollowButton userID={_id} />
        }

        return (
          <ListItem
            key={_id}
            label={isSpeaker ? 'Speaker' : 'Audience'}
            primary={name}
            renderBefore={<Avatar size='m' uri={avatar} />}
            renderAfter={_renderAction()}
          />
        )
      })}
    </>
  )
}
