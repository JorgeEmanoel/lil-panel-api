const { Schema, model } = require('mongoose')

const Namespace = new Schema({
    name: String,
    visibility: String,
    user_id: String,
})

module.exports = model('Namespace', Namespace);