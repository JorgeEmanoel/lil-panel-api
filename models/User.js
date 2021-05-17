const { Schema, model } = require('mongoose')
const Namespace = require('../schemas/Namespace.js')

const User = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  token: String,
  namespaces: [Namespace]
})

module.exports = model('User', User)