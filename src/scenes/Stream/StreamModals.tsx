import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import Modal from '../../core/Modal'
import Typography from '../../core/Typography'
import { useStream } from '../../hooks/useStream'
import { streamUpdated } from '../../slices/stream'
import AudienceModal from './AudienceModal'
import InviteModal from './InviteModal'

const MODAL_HEIGHT = Dimensions.get('window').height * .6

export default function StreamModals() {
  const { openModal } = useStream()
  const dispatch = useDispatch()
  const handleClose = () => dispatch(streamUpdated({ openModal: '' }))

  const _renderTitle = () => {
    switch (openModal) {
      case 'AUDIENCE': return 'Audience';
      case 'ON_STAGE': return 'On Stage';
      case 'INVITE': return 'Invite'
      default: return '';
    }
  }

  const _renderContent = () => {
    switch (openModal) {
      case 'AUDIENCE': return <AudienceModal />;
      case 'INVITE': return <InviteModal />;
      case 'ON_STAGE': return null;
      default: return null;
    }
  }

  return (
    <Modal height={MODAL_HEIGHT} isOpen={!!openModal} title={_renderTitle()} onClose={handleClose}>
      {_renderContent()}
    </Modal >
  )
}
