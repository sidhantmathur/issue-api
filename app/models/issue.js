const mongoose = require('mongoose')
const commentSchema = require('./comment')

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [commentSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Issue', issueSchema)
