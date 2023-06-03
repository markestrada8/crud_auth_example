const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const goalRoutes = require('./routes/goalRoutes')

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/goals', goalRoutes)

app.use(errorHandler)











app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
