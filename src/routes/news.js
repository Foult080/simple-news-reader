const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validationErrors } = require('../middlewares/validationErrors')
const { addNewsRecord, getNewsRecords, getMyNewsRecords, deleteNewsRecord } = require('../controllers/news')

// добавить запись новости
router.post(
  '/',
  [
    check('title', 'Укажите заголовок для новости').not().isEmpty(),
    check('description', 'Укажите содержимое новости').not().isEmpty(),
    check('releaseDate').optional({ checkFalsy: true }).isISO8601().withMessage('Не корректная дата')
  ],
  validationErrors,
  addNewsRecord
)

// получить записи новостей
router.get('/', getNewsRecords)

// получить созданные мной записи
router.get('/my', getMyNewsRecords)

// удалить запись из базы
router.delete('/:id', deleteNewsRecord)

module.exports = router