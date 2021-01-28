const router = require('express').Router()
const { ChatRoom, Post, User } = require('../models')

// *************get messages of chatroom***************
router.get('/messages/:roomId', (req, res) => {
  const RoomId = req.params.roomId
  ChatRoom.findOne({ _id: RoomId })
    .populate('messages')
    .then((doc) => res.json(doc))
})

// ****************get user's chatroom list*******************
router.get('/list/:username', (req, res) => {
  User.findOne({ username: req.params.username })
    .populate('ChatRoom')
    .then((doc) => {
      return res.json(doc.ChatRoom)
    })
})

// *************creating new chatroom******************
router.post('/', (req, res) => {
  // user1 is seller, user2 is inquirier
  console.log(req.body._id)
  Post.findById(req.body.postId).then((docs) => {
    console.log(docs)
    const user1 = docs.userName
    const user2 = req.body.username
    const chatroom = { members: [user1, user2], messages: [] }

    // create chatroom and get chatroom id
    let roomId
    ChatRoom.create(chatroom).then((doc) => {
      roomId = doc._id

      // save chatroom id to both users
      User.findOne({ username: user1 }).then((doc) => {
        console.log(doc)
        doc.ChatRoom.push(roomId)
        doc.save()
      })
      User.findOne({ username: user2 }).then((doc) => {
        doc.ChatRoom.push(roomId)
        doc.save()
      })
      return res.json(doc)
    })
  })
})

module.exports = router
