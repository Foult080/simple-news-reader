const crypto = require('crypto')
const users = require('../models/users')
const { handleError, BadRequest } = require('../utils/errorsHandler')
const User = require('../models/users')

/**
 * Зарегистрировать нового пользователя в сервисе
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, password, email } = req.body
    // проверка наличия пользователя
    const user = await users.findOne({ email })
    if (user) throw BadRequest('Пользователь уже зарегистрирован в системе')

    // хешируем пароль пользователя
    //! принципиально не использую bcrypt из-за возможнных проблем с node-pre-gyp
    const salt = crypto.randomBytes(16).toString('hex')
    const hashded = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex')

    // сохраняем запись
    const userRecord = new User({ name, email, password: hashded })
    await userRecord.save()

    return res.status(200).json({ msg: 'Пользователь успешно зарегистрирован', name, password })
  } catch (error) {
    handleError(error, next)
  }
}

module.exports = { registerUser }
