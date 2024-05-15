const crypto = require('crypto')

/**
 * Метод для проверки пароля пользователя
 * @param {string} password
 * @param {string} userPassword
 * @param {string} salt
 * @returns {boolean}
 */
const isMatchPassword = (password, userPassword, salt) => {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex')
  return hash === userPassword
}

module.exports = { isMatchPassword }
