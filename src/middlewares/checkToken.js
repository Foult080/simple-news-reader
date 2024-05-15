require('dotenv').config()
const jose = require('jose')
const { handleError, Forbidden, Unauthorized, BadRequest } = require('../utils/errorsHandler')

/**
 * Метод возращающий время для проверки протухания токена
 * @returns {number}
 */
const checkClockTime = (expireTime) => {
  const currentTime = Math.floor(Date.now() / 1000)
  if (currentTime >= expireTime) return true
  return false
}

/**
 * Проверить токен пользователя
 */
const checkToken = async (req, res, next) => {
  // получить токен доступа
  const token = req.header('authorization')?.split(' ')[1]
  try {
    if (!token) throw Unauthorized('Нет токена, авторизация отклонена')
    const { displayname, email, roles, exp, id_user, snils_hash } = jose.decodeJwt(token)
    if (checkClockTime(exp)) throw Forbidden('Истек срок жизни токена')
    req.user = { name: displayname, email, role: roles, id_user: id_user || snils_hash }
    next()
  } catch (error) {
    return handleError(error, next)
  }
}

/**
 * Проверка прав администратора
 */
const checkAdmin = (req, res, next) => {
  const { user } = req
  const { role } = user
  try {
    if (role !== 'admin') throw BadRequest('Недостаточно прав')
    return next()
  } catch (error) {
    handleError(error, next)
  }
}

module.exports = { checkToken, checkAdmin }
