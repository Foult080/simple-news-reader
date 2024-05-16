import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../reducers/AuthSlice'
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

// Обертка для проверки роли пользователя
export const CheckRoleAdmin = () => {
  const auth = useSelector(selectAuth) // селектор с авторизацией и проверка токена
  const { user } = auth
  if (user.role === 'admin') return <Outlet />
  else return <Navigate to="/forbidden" replace />
}

/**
 * Метод для проверки роли пользователя. Нужен для разграничения прав и наследования компонентов в дере маршрутизации
 * @returns {Component}
 */
export const CheckUserRole = () => {
  const auth = useSelector(selectAuth)
  const { user } = auth
  if (user.role === 'user') return <Outlet />
  else return <Navigate to="/forbidden" replace />
}

/**
 * Метод для проверки роли пользователя ОРИМО. Нужен для разграничения прав и наследования компонентов в дере маршрутизации
 * @returns {Component}
 */
export const CheckUserClose = () => {
  const auth = useSelector(selectAuth)
  const { user } = auth
  if (user.role === 'close') return <Outlet />
  else return <Navigate to="/forbidden" replace />
}
