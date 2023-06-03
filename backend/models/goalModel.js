const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Enter a text value']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)