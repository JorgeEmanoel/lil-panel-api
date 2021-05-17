const { Schema, model } = require('mongoose')

const User = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
})

module.exports = model('User', User);