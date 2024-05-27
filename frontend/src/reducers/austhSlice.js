import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../utils/utils'
import { axiosApiInstance } from '../utils/axiosInterceprots'

// TODO: вынести в utils
const config = { headers: { 'Content-type': 'application/json' } }

// Метод для авторизации пользователя
export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(baseUrl + '/api/users/auth', data, config)
    return res.data
  } catch (error) {
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

// метод для регитсрации пользователя
export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(baseUrl + '/api/users/', data, config)
    return res.data
  } catch (error) {
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

// загрузка информации о пользователе
export const loadUser = createAsyncThunk('auth/loadUser', async (data, { rejectWithValue }) => {
  try {
    const res = await axiosApiInstance.get(baseUrl + '/api/users/auth')
    return res.data
  } catch (error) {
    return rejectWithValue({ status: error.response.status, data: error.response.data })
  }
})

// объект для инициализации стэйка
const initialState = {
  isAuth: null,
  loading: false,
  user: null,
  alert: null
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // события для "выхода" из учетной записи
    logOut: (state) => {
      state.isAuth = null
      state.loading = false
      state.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },
    // очистка алертов
    cleanAlert: (state) => {
      state.alert = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Регистрация пользователя
      .addCase(registerUser.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        const { user, msg, authToken } = action.payload
        state.user = user
        state.isAuth = true
        localStorage.setItem('access_token', authToken)
        state.alert = { color: 'green', msg }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        const { msg, errors } = action.payload.data
        state.alert = { color: 'red', msg, errors }
      })
      // загрузка информации о пользователе
      .addCase(loadUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuth = true
        state.user = action.payload
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isAuth = false
        state.loading = false
        state.user = null
        state.error = action.payload.data
      })
      // авторизация пользователя
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, authToken } = action.payload
        state.isAuth = true
        state.loading = false
        state.user = user
        localStorage.setItem('access_token', authToken)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        const { msg, errors } = action.payload.data
        state.alert = { color: 'red', msg, errors }
      })
  }
})

export const { logOut, cleanAlert } = AuthSlice.actions

export const selectAuth = (state) => state.auth

export default AuthSlice.reducer
