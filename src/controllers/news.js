const { handleError } = require('../utils/errorsHandler')
const path = require('path')
const News = require('../models/news')
const File = require('../models/files')

// путь к папке в зависимости от окружения
const filesPath = process.env.ENV === 'production' ? path.resolve('frontend', 'build', 'files') : path.resolve('frontend', 'public', 'files')

/**
 * Метод для сохранения файла в директорию
 * @param {String} idUser - идентификатор пользователя
 * @param {Array} files - массив файлов
 * @returns {Array}
 */
const saveFiles = async (idUser, files) => {
  const result = []
  //! express file upload может вернуть как объект, так и массив объектов
  if (!Array.isArray(files)) {
    files.name = idUser + '-' + files.name
    const pathToFile = path.join(filesPath, files.name)
    await files.mv(pathToFile)
    const fileObject = new File({ name: files.name })
    await fileObject.save()
    result.push(fileObject)
  } else {
    for await (const file of files) {
      file.name = idUser + '-' + file.name
      const pathToFile = path.join(filesPath, file.name)
      await file.mv(pathToFile)
      const fileObject = new File({ name: file.name })
      await fileObject.save()
      result.push(fileObject)
    }
  }
  return result
}

/**
 * Добавить запись новости
 */
const addNewsRecord = async (req, res, next) => {
  try {
    const { title, description, releaseDate } = req.body
    const { user_id } = req.user
    // проверка существания файла в запросе
    const { files } = req.files
    const filesData = await saveFiles(user_id, files)
    const newsRecord = new News({ title, description, releaseDate, user: user_id, files: filesData })
    await newsRecord.save()
    return res.status(200).json({ msg: 'Запись успешно создана' })
  } catch (error) {
    handleError(error, next)
  }
}

/**
 * Получить все записи новостей
 */
const getNewsRecords = async (req, res, next) => {
  try {
    const currentDate = new Date()
    const data = await News.find({ releaseDate: { $lte: currentDate } })
      .populate('files')
      .populate('user')
    return res.status(200).json({ data, count: data.length })
  } catch (error) {
    handleError(error, next)
  }
}

/**
 * Получить все записи пользователя
 */
const getMyNewsRecords = async (req, res, next) => {
  try {
    const { user_id } = req.user
    const data = await News.find({ user: user_id }).populate('files')
    return res.status(200).json({ data, count: data.length })
  } catch (error) {
    handleError(error, next)
  }
}

/**
 * Удалить запись новости
 */
const deleteNewsRecord = async (req, res, next) => {
  try {
    const { id } = req.params
    await News.deleteOne({ _id: id })
    return res.status(200).json({ msg: 'Запись была успешно удалена' })
  } catch (error) {
    handleError(error, next)
  }
}

module.exports = { addNewsRecord, getNewsRecords, getMyNewsRecords, deleteNewsRecord }
