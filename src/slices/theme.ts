import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../types";

const initialState = {
  colors: {},
  type: {},
  spacing: {},
} as Theme

const theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      Object.keys(action.payload)?.forEach(key => {
        state[key] = action.payload[key]
      })
    }
  }
})

export const {updateTheme} = theme.actions

export default theme.reducer
