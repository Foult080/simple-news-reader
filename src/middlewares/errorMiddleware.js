/**
 * Middleware функция для формирования ответов сервиса
 * @param {Object || Array} error - объект/массив ошибок
 */
const errorMiddleware = async (error, req, res, next) => {
  const { status, msg, errors } = error
  return res.status(status).json({ success: false, msg, errors })
}

module.exports = { errorMiddleware }
