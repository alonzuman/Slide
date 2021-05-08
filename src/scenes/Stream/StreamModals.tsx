import React from 'react'
import Constants from '../../constants/Constants'
import Modal from '../../core/Modal'
import useStreamLayout from '../../hooks/useStreamLayout'
import { closeModal } from '../../slices/streamLayout'
import { useAppDispatch } from '../../store'
import Stream from '../../utils/Stream'
import StreamModalFilters from './StreamModalFilters'
import StreamModalProfilePreview from './StreamModalProfilePreview'
import StreamModalWidgets from './StreamModalWidgets'

export default function StreamModals() {
  const { openModal } = useStreamLayout()
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(closeModal())

  const _renderTitle = () => {
    switch (openModal) {
      case Constants.Modals.FILTERS: return 'Filters';
      case Constants.Modals.WIDGETS: return 'Widgets';
      case Constants.Modals.USER: return '';
      default: return '';
    }
  }

  const _renderContent = () => {
    switch (openModal) {
      case Constants.Modals.FILTERS: return <StreamModalFilters />;
      case Constants.Modals.WIDGETS: return <StreamModalWidgets />;
      case Constants.Modals.USER: return <StreamModalProfilePreview />
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
