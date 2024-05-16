const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validationErrors } = require('../middlewares/validationErrors')
const { registerUser, authUser, checkUserToken } = require('../controllers/users')
const { checkToken } = require('../middlewares/checkToken')

// Зарегистрировать нового пользователя
router.post(
  '/',
  [
    check('name', 'Укажите имя пользователя').not().isEmpty(),
    check('password', 'Укажите пароль пользователя').not().isEmpty().isLength({ min: 8 }).withMessage('Длина пароля должна составлять 8 символов'),
    check('email', 'Укажите email адрес пользователя').not().isEmpty().isEmail().withMessage('Укажите корректный Email адрес')
  ],
  validationErrors,
  registerUser
)

// авторизовать пользователя
router.post(
  '/auth',
  [
    check('email', 'Укажите имя пользователя').not().notEmpty().isEmail().withMessage('Укажите корректный Email адрес'),
    check('password', 'Укажите пароль пользователя').not().notEmpty()
  ],
  validationErrors,
  authUser
)

// получить информацию из токена
router.get('/auth', checkToken, checkUserToken)

module.exports = router
