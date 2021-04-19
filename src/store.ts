import { configureStore } from "@reduxjs/toolkit";
import stream from './slices/stream'
import theme from './slices/theme'

const store = configureStore({
  reducer: {
    stream,
    theme
  }
})

export default store;
