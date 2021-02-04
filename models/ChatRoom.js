const mongoose = require('mongoose')
const { Schema } = mongoose

const ChatRoomSchema = new Schema(
  {
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    members: [],
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  },
  { timestamps: true }
)
const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema)

module.exports = ChatRoom
