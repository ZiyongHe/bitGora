const router = require('express').Router()
const { User } = require('../models')
const passport = require('../config/passport')

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/user/login',
    failureFlash: true,
  }),
  (req, res) => {
    res.json({
      data: {
        email: req.user.email,
        username: req.user.username,
        chatRoom: req.user.ChatRoom,
        userNotification: req.user.userNotification,
      },
    })
  }
)

// Failure route to deliver error message
router.get('/login', (req, res) => {
  res.status(401).json({
    err: req.flash('error'),
  })
})

// Check if currently logged in
router.get('/current-session', (req, res) => {
  if (req.user) {
    return res.status(200).json({
      data: {
        email: req.user.email,
        username: req.user.username,
        chatRoom: req.user.ChatRoom,
        userNotification: req.user.userNotification,
      },
    })
  } else {
    return res.status(200).json({ data: {} })
  }
})

router.post('/signup', async (req, res) => {
  try {
    const existingEmail = await User.findOne({ email: req.body.email })
    if (existingEmail) {
      return res
        .status(405)
        .json({ err: 'An account under that email already exists.' })
    }

    const existingUsername = await User.findOne({ username: req.body.username })
    if (existingUsername) {
      return res.status(405).json({
        err: 'Username taken. Please select a different username.',
      })
    }

    const newUser = await User.create(req.body)
    if (newUser) {
      res.redirect(307, '/user/login')
    } else {
      res.status(500).json({ err: "Can't create your account at this time. " })
    }
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  res.status(200).json({
    data: 'Successfully logged out.',
  })
})
router.put('/notification', (req, res) => {
  User.findOne({ username: req.body.username }).then(async (doc) => {
    doc.userNotification = req.body.newUserNotification
    console.log(req.body.newUserNotification)
    console.log(doc.userNotification)
    doc.save()
    return res.json(doc)
  })
})

module.exports = router
