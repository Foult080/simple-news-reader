import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../utils/utils'
import { axiosApiInstance } from '../utils/axiosInterceprots'

// загрузка новостей пользователя
export const loadNews = createAsyncThunk('news/loadNews', async (data, { rejectWithValue }) => {
  try {
    const res = await axiosApiInstance.get(baseUrl + '/api/news')
    return res.data
  } catch (error) {
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

const initialState = {
  loading: false,
  news: [],
  count: null,
  alert: null
}

export const NewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    cleanAlert: (state) => {
      state.alert = null
    }
  },
  extraReducers: (builder) => {
    builder
      // загрузка новостей для главной страницы
      .addCase(loadNews.pending, (state) => {
        state.loading = true
      })
      .addCase(loadNews.fulfilled, (state, action) => {
        state.loading = false
        const { data, count } = action.payload
        state.news = data
        state.count = count
      })
      .addCase(loadNews.rejected, (state, action) => {
        state.loading = false
        const { msg, errors } = action.payload.data
        state.alert = { color: 'red', msg, errors }
      })
  }
})

export const { cleanAlert } = NewsSlice.actions

export const selectNews = (state) => state.news

export default NewsSlice.reducer
