const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 20
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  forgotPassword: {
    type: Boolean
  },
  otp: {
    code: String,
    createdAt: {
      type: Date,
    }
  }
})

module.exports = mongoose.model('Userauth', userSchema)