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

// загрузка новостей пользователя
export const loadMyNews = createAsyncThunk('news/loadMyNews', async (data, { rejectWithValue }) => {
  try {
    const res = await axiosApiInstance.get(baseUrl + '/api/news/my')
    return res.data
  } catch (error) {
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

// загрузка записи новости
export const loadRecord = createAsyncThunk('news/loadRecord', async (data, { rejectWithValue }) => {
  try {
    const res = await axiosApiInstance.get(baseUrl + '/api/news/' + data)
    return res.data
  } catch (error) {
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

// удалить запись из базы
export const deleteRecord = createAsyncThunk('news/deleteRecord', async (data, { rejectWithValue }) => {
  try {
    const res = await axiosApiInstance.delete(baseUrl + '/api/news/' + data)
    return res.data
  } catch (error) {
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

const initialState = {
  loading: false,
  news: [],
  record: { title: '', description: '', content: '', files: [], image: '', user: null },
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
      // загрузка новостей пользователя
      .addCase(loadMyNews.pending, (state) => {
        state.loading = true
      })
      .addCase(loadMyNews.fulfilled, (state, action) => {
        state.loading = false
        const { data, count } = action.payload
        state.news = data
        state.count = count
      })
      .addCase(loadMyNews.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
      })
      // загрузка новости для стараницы просмотра
      .addCase(loadRecord.pending, (state) => {
        state.loading = true
      })
      .addCase(loadRecord.fulfilled, (state, action) => {
        state.loading = false
        state.record = action.payload.data
      })
      .addCase(loadRecord.rejected, (state, action) => {
        const { status } = action.payload
        state.loading = false
        state.alert = action.payload
        // делаем резкий переход на страницы с соответствующие статусу
        // TODO: Вынести в axios intercepror
        switch (status) {
          case 403:
            return window.location.replace('/forbidden')
          default:
            return window.location.replace('/not-found')
        }
      })
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
