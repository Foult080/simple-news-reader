const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validationErrors } = require('../middlewares/validationErrors')
const { addNewsRecord, getNewsRecords, getMyNewsRecords, deleteNewsRecord, getNewsRecord, editNewsRecord } = require('../controllers/news')

// добавить запись новости
router.post(
  '/',
  [
    check('title', 'Укажите заголовок для новости').not().isEmpty(),
    check('description', 'Укажите описание новости').not().isEmpty(),
    check('content', 'Укажите содержимое новости').not().isEmpty(),
    check('releaseDate').optional({ checkFalsy: true }).isISO8601().withMessage('Не корректная дата')
  ],
  validationErrors,
  addNewsRecord
)

// обновить запись в базе
router.put('/:id', editNewsRecord)

// получить записи новостей
router.get('/', getNewsRecords)

// получить созданные мной записи
router.get('/my', getMyNewsRecords)

router.get('/:id', getNewsRecord)

// удалить запись из базы
router.delete('/:id', deleteNewsRecord)

module.exports = router
