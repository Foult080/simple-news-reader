import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './reducers/austhSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer
  }
})

export default store
