const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validationErrors } = require('../middlewares/validationErrors')
const { registerUser } = require('../controllers/users')

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

// authenticate user
router.post(
  '/auth',
  [check('name', 'Укажите имя пользователя').not().notEmpty(), check('password', 'Укажите пароль пользователя').not().notEmpty()],
  validationErrors
)

module.exports = router
