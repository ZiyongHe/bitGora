const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', function (next) {
  // Hash password before saving to database
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
