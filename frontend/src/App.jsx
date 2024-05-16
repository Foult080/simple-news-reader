import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

// redux
import store from './store'
import { Provider } from 'react-redux'
import { loadUser } from './reducers/austhSlice'
import MainBar from './components/MainBar'
import AuthUser from './components/auth/AuthUser'
import RegisterUser from './components/auth/RegisterUser'
import MainPage from './components/MainPage'

// компоненты для страницы

const App = () => {
  // хук для авторизации
  useEffect(() => {
    localStorage.access_token && store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainBar />
        <Routes>
          <Route path="/sign-in" element={<AuthUser />} />
          <Route path="/new-user" element={<RegisterUser />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
