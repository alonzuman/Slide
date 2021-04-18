import { configureStore } from "@reduxjs/toolkit";
import user from './slices/user'
import home from './slices/home'
import stream from './slices/stream'
import theme from './slices/theme'

const store = configureStore({
  reducer: {
    user,
    home,
    stream,
    theme
  }
})

export default store;
