const mongoose = require('mongoose')
/**
 * Описание схемы новости
 */
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  releaseDate: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'files' },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files' }]
})

module.exports = mongoose.model('news', newsSchema)
