/**
 * Описание схемы пользователя до MongoDB
 */
const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, dropDups: true },
  salt: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('users', usersSchema)
