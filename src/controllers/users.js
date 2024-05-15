const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const users = require('../models/users')
const { handleError, BadRequest, NotFound, Unauthorized } = require('../utils/errorsHandler')
const User = require('../models/users')
const { isMatchPassword } = require('../utils/utils')

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
    const userRecord = new User({ name, email, salt, password: hashded })
    await userRecord.save()

    return res.status(200).json({ msg: 'Пользователь успешно зарегистрирован' })
  } catch (error) {
    handleError(error, next)
  }
}

/**
 * Авторизовать пользователя в системе
 */
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // поиск пользователя
    const user = await users.findOne({ email })
    if (!user) throw NotFound(`Пользователь с Email: ${email} не найден`)

    // проверка пароля пользователя
    const isMatch = isMatchPassword(password, user.password, user.salt)
    if (!isMatch) throw Unauthorized('Не корректное имя пользователя или пароль')

    // убираем лишнее из объекта пользователя
    delete user.password
    delete user.salt
    const authToken = jwt.sign({ name: user.name, email: user.email, date: user.date }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFE })

    return res.status(200).json({ msg: 'Вы успешно авторизовались', authToken })
  } catch (error) {
    handleError(error, next)
  }
}

/**
 * Получить информацию о пользователе из токена доступа
 */
const checkUserToken = async (req, res, next) => {
  try {
    const user = req.user
    return res.status(200).json(user)
  } catch (error) {
    handleError(error, next)
  }
}

module.exports = { registerUser, authUser, checkUserToken }
