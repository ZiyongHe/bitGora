const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema({
  body: String,
  senderId: String,
})
const Message = mongoose.model('Message', messageSchema)

module.exports = Message
