const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema(
  {
    body: String,
    username: String,
  },
  { timestamps: true }
)
const Message = mongoose.model('Message', messageSchema)

module.exports = Message
