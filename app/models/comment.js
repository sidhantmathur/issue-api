'use strict'

// requiring the mongoose library
const mongoose = require('mongoose')

// Create schema contstructor
const Schema = mongoose.Schema

const commentSchema = new Schema({
  title: String,
  body: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

module.exports = commentSchema
