const router = require('express').Router()
const version = require('../../package.json').version
const { checkToken } = require('../middlewares/checkToken')

// маршрут для пользователей
router.use('/users', require('./users'))

// маршрут для новостей
router.use('/news', checkToken, require('./news'))

// проверка работы для k8, zabbix или др
router.get('/health', async (req, res) => res.status(200).json({ success: true, version, msg: 'Сервис работает стабильно' }))

// 404
router.use('*', async (req, res) => res.status(404).json({ success: false, msg: 'Маршрут не распознан' }))

module.exports = router
