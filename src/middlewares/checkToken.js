require('dotenv').config()
const jwt = require('jsonwebtoken')
const { handleError, Unauthorized } = require('../utils/errorsHandler')

/**
 * Проверить токен пользователя
 */
const checkToken = async (req, res, next) => {
  try {
    // получить токен доступа
    const token = req.header('authorization')?.split(' ')[1]
    // проверка токена доступа
    if (!token) throw Unauthorized('Нет токена, авторизация отклонена')
    const { user_id, name, email, date } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { user_id, name, email, date }
    next()
  } catch (err) {
    let error
    // проверяем что за ошибка и делаем вывод на основании типа ошибки
    switch (err.name) {
      case 'JsonWebTokenError': {
        error = Unauthorized('Не корректный токен. Повторно авторизуйтесь в системе.')
        break
      }
      case 'TokenExpiredError': {
        error = Unauthorized('Срок жизни вашего токена истёк. Повторно авторизуйтесь в системе.')
        break
      }
      default:
        error = err
    }
    // передаем ошибку дальше
    return handleError(error, next)
  }
}

module.exports = { checkToken }
