import React from 'react'
import { Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import Constants from '../../constants/Constants'
import Modal from '../../core/Modal'
import useStreamLayout from '../../hooks/useStreamLayout'
import AudienceModal from './AudienceModal'
import InviteModal from './InviteModal'

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
      case Constants.StreamModals.AUDIENCE: return <AudienceModal />;
      case Constants.StreamModals.INVITES: return <InviteModal />;
      case Constants.StreamModals.ON_STAGE: return null;
      default: return null;
    }
  }

  return (
    <Modal height={MODAL_HEIGHT} isOpen={!!layout?.openModal} title={_renderTitle()} onClose={closeModal}>
      {_renderContent()}
    </Modal >
  )
}
