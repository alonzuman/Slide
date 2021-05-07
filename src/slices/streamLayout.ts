import { createSlice } from "@reduxjs/toolkit";

const { reducer, actions } = createSlice({
  name: "streamLayout",
  initialState: {
    openModal: "",
    params: null,
    isZenMode: false,
  },
  reducers: {
    setOpenModal: (state, { payload }) => {
      state.openModal = payload.modal;
      state.params = payload.params;
    },
    closeModal: (state) => {
      state.openModal = "";
      state.params = null;
    },
    toggleZenMode: (state) => {
      state.isZenMode = !state.isZenMode;
    },
  },
});

export const { setOpenModal, closeModal, toggleZenMode } = actions;

export default reducer;
