const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI)

    console.log(`MongoDB connection: ${connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { connectDB }