const { handleError, NotFound, Forbidden } = require('../utils/errorsHandler')
const path = require('path')
const News = require('../models/news')
const File = require('../models/files')
const { isValidObjectId } = require('mongoose')

// путь к папке в зависимости от окружения
const filesPath = process.env.ENV === 'production' ? path.resolve('frontend', 'build', 'public', 'files') : path.resolve('frontend', 'public', 'files')
const imagesPath = process.env.ENV === 'production' ? path.resolve('frontend', 'build', 'public', 'images') : path.resolve('frontend', 'public', 'images')

/**
 * Метод для сохранения файла в директорию
 * @param {String} idUser - идентификатор пользователя
 * @param {String} savePath - путь для файла
 * @param {Array} files - массив файлов
 * @returns {Array}
 */
const saveFiles = async (idUser, savePath, files) => {
  //! express file upload может вернуть как объект, так и массив объектов
  if (!Array.isArray(files)) {
    files.name = idUser + '-' + files.name
    const pathToFile = path.join(savePath, files.name)
    await files.mv(pathToFile)
    const fileObject = new File({ name: files.name })
    await fileObject.save()
    return fileObject
  } else {
    const result = []
    for await (const file of files) {
      file.name = idUser + '-' + file.name
      const pathToFile = path.join(savePath, file.name)
      await file.mv(pathToFile)
      const fileObject = new File({ name: file.name })
      await fileObject.save()
      result.push(fileObject)
    }
    return result
  }
}

/**
 * Добавить запись новости
 */
const addNewsRecord = async (req, res, next) => {
  try {
    const { title, description, releaseDate, content } = req.body
    const { user_id } = req.user

    // проверка существания файлов в запросе

    // TODO: Поправить метод сохранения файлов дублей файлов
    //! если передавать массив с фронта то прилетает ключ files[]. Надо будет разобраться
    const filesData = await saveFiles(user_id, filesPath, req.files['files[]'])
    const newsImage = await saveFiles(user_id, imagesPath, req.files.image)

    // формируем запись для вставки
    const newsRecord = new News({ title, description, releaseDate, user: user_id, image: newsImage, files: filesData, content })
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
      .populate({ path: 'user', select: 'name email' })
      .populate('image')
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
    const data = await News.find({ user: user_id }).populate('files').populate('image')
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

/**
 * Получить запись по id
 */
const getNewsRecord = async (req, res, next) => {
  try {
    const { id } = req.params

    // проверка валидности объекта
    const check = isValidObjectId(id)
    if (!check) throw Forbidden('Действие запрещено')

    const data = await News.findOne({ _id: id }).populate({ path: 'user', select: 'name email' }).populate('image').populate('files')
    if (!data) throw NotFound('Запись с этим идентификатор не найдена')
    return res.status(200).json({ data })
  } catch (error) {
    handleError(error, next)
  }
}

module.exports = { addNewsRecord, getNewsRecords, getNewsRecord, getMyNewsRecords, deleteNewsRecord }
