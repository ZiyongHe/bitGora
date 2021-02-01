const router = require('express').Router()
const { ChatRoom, Post, User } = require('../models')
const mongoose = require('mongoose')

// *************get messages of chatroom***************
router.get('/messages/:roomId', (req, res) => {
  const RoomId = req.params.roomId
  ChatRoom.findOne({ _id: mongoose.Types.ObjectId(RoomId) })
    .populate('messages')
    .then((doc) => {
      console.log('The populated chat data is sent to client successfully: ')
      console.log(doc)
      res.json(doc)
    })
})

// ****************get user's chatroom list*******************
router.get('/list/:username', (req, res) => {
  User.findOne({ username: req.params.username })
    .populate('ChatRoom')
    .then((doc) => {
      console.log(
        'Chat room list of the user is sent to client successfully: ' + doc
      )
      return res.json(doc.ChatRoom)
    })
})

// *************creating new chatroom******************
router.post('/', (req, res) => {
  // user1 is seller, user2 is inquirier
  console.log('Received creat room request, ref post Id: ' + req.body.postId)
  Post.findById(req.body.postId).then(async (docs) => {
    const user1 = docs.userName
    const user2 = req.body.username
    const chatroom = { members: [user1, user2], messages: [] }

    // check if inquirier already has a room with the seller
    const roomExist = await ChatRoom.findOne({ members: [user1, user2] })
    console.log(roomExist)
    if (roomExist) {
      console.log('Room already exists, pulling out the room record...')
      return res.json(roomExist)
    } else {
      // create chatroom and get chatroom id
      ChatRoom.create(chatroom).then((doc) => {
        const roomId = doc._id
        console.log('Created Room: ' + doc.id)

        // save chatroom id to both users
        User.findOne({ username: user1 }).then((doc) => {
          doc.ChatRoom.push(roomId)
          doc.save()
          console.log('Saved room record to seller account')
        })
        User.findOne({ username: user2 }).then((doc) => {
          doc.ChatRoom.push(roomId)
          doc.save()
          console.log('Saved room record to inquirer account')
        })
        return res.json(doc)
      })
    }
  })
})

module.exports = router
