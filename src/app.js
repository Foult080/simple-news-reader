require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

const connectDB = require('./utils/dbConnector.js')

// подключение к MongoDB
connectDB()

// cors
const cors = require('cors')
app.use(cors())

// use json encode
app.use(express.json({ extended: false }))

// middleware для загрузки файлов
app.use(fileUpload({ createParentPath: true, useTempFiles: false }))

// маршруты для api
app.use('/api', require('./routes'))

// статика с билдом фронта
app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist', 'index.html')))

// обработка ошибок
const { errorMiddleware } = require('./middlewares/errorMiddleware')

app.use(errorMiddleware)

// порт для запуска
const PORT = process.env.PORT || 5000

// запуск сервиса
const server = app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

// экспорт для тестов jest
module.exports = { app, server }
