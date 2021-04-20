import { configureStore } from "@reduxjs/toolkit";
import stream from './slices/stream'

const store = configureStore({
  reducer: {
    stream,
  }
})

export default store;
