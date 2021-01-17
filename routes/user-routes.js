const router = require('express').Router()
const { User } = require('../models')

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
