import { createSlice } from "@reduxjs/toolkit";
import API from "../API/API";

const initialState = {
  user: null,
  isLoading: true,
  isUpdating: false,
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isLoading = false
      state.isUpdating = false
    },
    clearUser: (state) => {
      state.user = null
      state.isLoading = false
      state.isUpdating = false
    }
  }
})

export const {
  setUser,
  clearUser
} = user.actions

export const fetchMyUser = () => async dispatch => {
  const data = await API.Me.getMyUser()
  dispatch(setUser(data))
}

export const refreshMyUser = () => async dispatch => {
  const data = await API.Me.getMyUser()
  dispatch(setUser(data))
}

export default user.reducer;
