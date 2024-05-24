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
import { RequireAuth } from './components/auth/RequireAuth'
import Forbidden from './components/Forbidden'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import News from './components/News'
import MyPage from './components/MyPage'
import CreateRecord from './components/CreateRecord'
import EditRecord from './components/EditRecord'

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
        <div className="app-content">
          <Routes>
            <Route path="/sign-in" element={<AuthUser />} />
            <Route path="/new-user" element={<RegisterUser />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/my" element={<MyPage />} />
              <Route path="/create-news" element={<CreateRecord />} />
              <Route path="/edit-news/:id" element={<EditRecord />} />
              <Route path="/news/:id" element={<News />} />
            </Route>
            <Route element={<Forbidden />} path="/forbidden" />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App
