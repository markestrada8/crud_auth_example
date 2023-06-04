const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
  user: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  content: {
    type: String,
    required: [true, 'Enter a text value']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)