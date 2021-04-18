import { createSlice } from "@reduxjs/toolkit";
import API from "../API/API";

const initialState = {

}

const home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSection: (state, action) => {
      const { data, section } = action.payload;
      state[section] = {
        data,
        isLoading: false,
        isUpdating: false,
        isRefreshing: false
      }
    },

    refreshHomeSections: (state) => {
      Object.keys(state)?.forEach(key => {
        state[key].isRefreshing = true
      })
    }
  }
})

export const {
  setSection,
  refreshHomeSections
 } = home.actions

export const fetchHomeSections = () => async dispatch => {
  const data = await API.Streams.fetchLiveStreams()

  dispatch(setSection({
    section: 'streams',
    data
  }))
}

export default home.reducer
