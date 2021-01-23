const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    publicId: String,
    url: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  sold: {
    type: Boolean,
    default: false,
  },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
