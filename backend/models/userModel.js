const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Enter a username']
    },
    email: {
      type: String,
      required: [true, 'Enter an email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Enter a password']
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)