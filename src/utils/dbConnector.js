const mongoose = require('mongoose')
// const config = require('config')
// const db = config.get('MongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@localhost:${process.env.DB_PORT}/news-reader?authSource=admin`)
    console.info('MongoDB connected')
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

module.exports = connectDB
