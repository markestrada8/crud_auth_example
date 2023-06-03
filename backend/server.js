const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { connectDB } = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const goalRoutes = require('./routes/goalRoutes')


const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.use('/api/goals', goalRoutes)

app.use(errorHandler)











app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
