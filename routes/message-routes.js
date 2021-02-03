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

    // check if inquirier already has a room with the seller
    const roomExist = await ChatRoom.findOne({
      members: [user1, user2],
      postId: mongoose.Types.ObjectId(req.body.postId),
    })
    if (roomExist) {
      return res.json(roomExist)
    } else {
      // create chatroom and get chatroom id
      ChatRoom.create(chatroom).then((doc) => {
        const roomId = doc._id

        // save chatroom id to both users
        User.findOne({ username: user1 }).then((doc) => {
          doc.ChatRoom.push(roomId)
          doc.save()
        })
        User.findOne({ username: user2 }).then((doc) => {
          doc.ChatRoom.push(roomId)
          doc.save()
        })
        return res.json(doc)
      })
    }
  })
})

// *************add 1 in chatroom notification array***************
router.put('/addnotifictaion/:roomId', (req, res) => {
  const RoomId = req.params.roomId
  const index = req.body.index
  ChatRoom.findOne({ _id: mongoose.Types.ObjectId(RoomId) })
    .then((doc) => {
      doc.chatNotification[index] += 1
      doc.save()
    })
    .then((doc) => {
      res.json(doc)
    })
})

// *************zero in chatroom notification array***************
router.put('/zeronotifictaion/:roomId', (req, res) => {
  const RoomId = req.params.roomId
  const username = req.body.username
  ChatRoom.findOne({ _id: mongoose.Types.ObjectId(RoomId) })
    .then((doc) => {
      const index = doc.members.indexOf(username)
      doc.chatNotification[index] = 0
      doc.save()
    })
    .then((doc) => {
      res.json(doc)
    })
})

module.exports = router
