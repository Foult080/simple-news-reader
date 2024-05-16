import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './reducers/austhSlice'
import NewsReducer from './reducers/NewsSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    news: NewsReducer
  }
})

export default store
