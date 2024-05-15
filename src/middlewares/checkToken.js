require('dotenv').config()
const jwt = require('jsonwebtoken')
const { handleError, Unauthorized } = require('../utils/errorsHandler')

/**
 * Проверить токен пользователя
 */
const checkToken = async (req, res, next) => {
  // получить токен доступа
  const token = req.header('authorization')?.split(' ')[1]
  if (!token) throw Unauthorized('Нет токена, авторизация отклонена')
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (err) {
    let error
    // проверяем что за ошибка
    switch (error.name) {
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
