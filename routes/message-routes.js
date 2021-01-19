const router = require('express').Router()
const { Message } = require('../models')

// Failure route to deliver error message
router.get('/:roomId', (req, res) => {
  try {
    const message
  }
})

// Check if currently logged in
router.get('/current-session', (req, res) => {
  if (req.user) {
    return res
      .status(200)
      .json({ data: { email: req.user.email, username: req.user.username } })
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
    console.log(err)
    res.status(500).json({ err: err.message })
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  res.status(200).json({
    data: 'Successfully logged out.',
  })
})

module.exports = router
