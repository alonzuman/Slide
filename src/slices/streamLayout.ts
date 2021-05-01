import { createSlice } from "@reduxjs/toolkit";

const { reducer, actions } = createSlice({
  name: 'streamLayout',
  initialState: {
    openModal: '',
    isZenMode: false
  },
  reducers: {
    setOpenModal: (state, { payload }) => {
      state.openModal = payload
    },
    closeModal: (state) => {
      state.openModal = ''
    },
    toggleZenMode: (state) => {
      state.isZenMode = !state.isZenMode
    }
  }
})

export const { setOpenModal, closeModal, toggleZenMode } = actions;

export default reducer;
