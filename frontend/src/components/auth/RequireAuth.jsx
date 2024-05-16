import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../reducers/austhSlice'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

/**
 * Обертка для авторизации
 */
export const RequireAuth = () => {
  const auth = useSelector(selectAuth) // селектор с авторизацией и проверка токена
  const { isAuth } = auth
  const location = useLocation()
  // отправим пользователя на страницу авторизации с сохранением страницы
  if (!isAuth) return <Navigate to="/sign-in" state={{ from: location }} replace />
  return <Outlet />
}
