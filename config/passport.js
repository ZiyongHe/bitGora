const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { User } = require('../models')
const mongoose = require('mongoose')

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username: username })
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      } else if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' })
      } else {
        return done(null, user)
      }
    } catch (err) {
      done(err)
    }
  })
)

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) })
    done(null, user)
  } catch (err) {
    done(err)
  }
})

module.exports = passport
