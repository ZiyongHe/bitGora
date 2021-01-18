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
      },
    })
  }
)

router.get('/login', (req, res) => {
  res.status(401).json({
    error: req.flash('error'),
  })
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
    res.status(201).json({
      data: newUser,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: err.message })
  }
})

module.exports = router
