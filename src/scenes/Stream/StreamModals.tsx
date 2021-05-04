import React from 'react'
import Constants from '../../constants/Constants'
import Modal from '../../core/Modal'
import useStreamLayout from '../../hooks/useStreamLayout'
import { closeModal } from '../../slices/streamLayout'
import { useAppDispatch } from '../../store'
import Stream from '../../utils/Stream'
import StreamAudienceModal from './StreamAudienceModal'
import StreamFiltersModal from './StreamFiltersModal'
import StreamInviteModal from './StreamInviteModal'
import StreamMoreModal from './StreamMoreModal'
import StreamStageModal from './StreamStageModal'
import StreamWidgetsModal from './StreamWidgetsModal'

export default function StreamModals() {
  const { openModal } = useStreamLayout()
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(closeModal())

  const _renderTitle = () => {
    switch (openModal) {
      case Constants.Modals.ON_STAGE: return 'On Stage';
      case Constants.Modals.INVITES: return 'Invite';
      case Constants.Modals.FILTERS: return 'Effects';
      case Constants.Modals.WIDGETS: return 'Widgets';
      default: return '';
    }
  }

  const _renderContent = () => {
    switch (openModal) {
      case Constants.Modals.INVITES: return <StreamInviteModal />;
      case Constants.Modals.ON_STAGE: return <StreamStageModal />;
      case Constants.Modals.FILTERS: return <StreamFiltersModal />;
      case Constants.Modals.WIDGETS: return <StreamWidgetsModal />;
      default: return null;
    }
  }

  return (
    <Modal
      height={Stream.getModalHeight(openModal)}
      isOpen={!!openModal}
      title={_renderTitle()}
      onClose={handleClose}
    >
      {_renderContent()}
    </Modal>
  )
}
