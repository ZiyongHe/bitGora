const router = require('express').Router()
const { ChatRoom, Post, User } = require('../models')
const mongoose = require('mongoose')

// *************get messages of chatroom***************
router.get('/messages/:roomId', (req, res) => {
  const RoomId = req.params.roomId
  ChatRoom.findOne({ _id: mongoose.Types.ObjectId(RoomId) })
    .populate('postId')
    .populate('messages')
    .then((doc) => {
      res.json(doc)
    })
})

// *******************get user's chatroom list**********************
router.get('/list/:username', (req, res) => {
  User.findOne({ username: req.params.username })
    .populate({
      path: 'ChatRoom',
      populate: 'postId',
    })
    .then((doc) => {
      return res.json(doc.ChatRoom)
    })
})

// *******************creating new chatroom************************
router.post('/', (req, res) => {
  // user1 is seller, user2 is inquirier
  Post.findById(req.body.postId).then(async (docs) => {
    const user1 = docs.userName
    const user2 = req.body.username
    const chatroom = {
      members: [user1, user2],
      messages: [],
      postId: mongoose.Types.ObjectId(req.body.postId),
    }
    console.log(chatroom.members)

    // check if inquirier already has a room with the seller
    const roomExist = await ChatRoom.findOne({
      members: [user1, user2],
      postId: mongoose.Types.ObjectId(req.body.postId),
    })

    if (roomExist) {
      return res.json(roomExist)
    } else {
      // create chatroom and get chatroom id
      ChatRoom.create(chatroom).then(async (doc) => {
        const roomId = doc._id

        // save chatroom id to both users
        // push a new 0 element to notification array
        await User.findOne({ username: user1 }).then(async (doc) => {
          doc.ChatRoom.push(roomId)
          doc.userNotification.push(0)
          await doc.save()
        })

        await User.findOne({ username: user2 }).then(async (doc) => {
          doc.ChatRoom.push(roomId)
          doc.userNotification.push(0)
          await doc.save()
        })
        doc
          .populate('postId')
          .execPopulate()
          .then((doc) => {
            return res.json(doc)
          })
      })
    }
  })
})

module.exports = router
