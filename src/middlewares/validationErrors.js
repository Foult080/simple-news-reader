const { validationResult } = require('express-validator')

/**
 * Обработчик ошибок express-validator
 */
const validationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, msg: 'В запросе обнаружены ошибки валидации', errors: errors.array({ onlyFirstError: true }) })
  }
  next()
}

module.exports = { validationErrors }
