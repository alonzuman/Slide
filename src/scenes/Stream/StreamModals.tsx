import React from 'react'
import { Dimensions } from 'react-native'
import Constants from '../../constants/Constants'
import Modal from '../../core/Modal'
import useStreamLayout from '../../hooks/useStreamLayout'
import StreamAudienceModal from './StreamAudienceModal'
import StreamInviteModal from './StreamInviteModal'
import StreamStageModal from './StreamStageModal'

const MODAL_HEIGHT = Dimensions.get('window').height * .6

export default function StreamModals() {
  const { layout, closeModal } = useStreamLayout()

  const _renderTitle = () => {
    switch (layout?.openModal) {
      case Constants.StreamModals.AUDIENCE: return 'Audience';
      case Constants.StreamModals.ON_STAGE: return 'On Stage';
      case Constants.StreamModals.INVITES: return 'Invite'
      default: return '';
    }
  }

  const _renderContent = () => {
    switch (layout?.openModal) {
      case Constants.StreamModals.AUDIENCE: return <StreamAudienceModal />;
      case Constants.StreamModals.INVITES: return <StreamInviteModal />;
      case Constants.StreamModals.ON_STAGE: return <StreamStageModal />;
      default: return null;
    }
  }

  return (
    <Modal height={MODAL_HEIGHT} isOpen={!!layout?.openModal} title={_renderTitle()} onClose={closeModal}>
      {_renderContent()}
    </Modal >
  )
}
