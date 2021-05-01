import React from 'react'
import Constants from '../../constants/Constants'
import Modal from '../../core/Modal'
import useStreamLayout from '../../hooks/useStreamLayout'
import Stream from '../../utils/Stream'
import StreamAudienceModal from './StreamAudienceModal'
import StreamFiltersModal from './StreamFiltersModal'
import StreamInviteModal from './StreamInviteModal'
import StreamStageModal from './StreamStageModal'
import StreamWidgetsModal from './StreamWidgetsModal'

export default function StreamModals() {
  const { layout, closeModal } = useStreamLayout()

  const _renderTitle = () => {
    switch (layout?.openModal) {
      case Constants.StreamModals.AUDIENCE: return 'Audience';
      case Constants.StreamModals.ON_STAGE: return 'On Stage';
      case Constants.StreamModals.INVITES: return 'Invite'
      case Constants.StreamModals.FILTERS: return 'Effects'
      case Constants.StreamModals.WIDGETS: return 'Widgets'
      default: return '';
    }
  }

  const _renderContent = () => {
    switch (layout?.openModal) {
      case Constants.StreamModals.AUDIENCE: return <StreamAudienceModal />;
      case Constants.StreamModals.INVITES: return <StreamInviteModal />;
      case Constants.StreamModals.ON_STAGE: return <StreamStageModal />;
      case Constants.StreamModals.FILTERS: return <StreamFiltersModal />;
      case Constants.StreamModals.WIDGETS: return <StreamWidgetsModal />;
      default: return null;
    }
  }

  return (
    <Modal
      height={Stream.getModalHeight(layout?.openModal)}
      isOpen={!!layout?.openModal}
      title={_renderTitle()}
      onClose={closeModal}
    >
      {_renderContent()}
    </Modal >
  )
}
