const mongoose = require('mongoose')

/**
 * Описание схемы файлов для MongoDB.
 * Поскольку сама mongo при хранении файлов через GridFS имеет ограничение 16мб, то будем хранить в статичной директории. При публикации через Docker можно подключить volume
 */
const filesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, dropDups: true },
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('files', filesSchema)
