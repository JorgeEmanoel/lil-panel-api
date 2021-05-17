const { Schema } = require('mongoose')

const Card = new Schema({
  name: String,
  backgroundColor: String,
  backgroundUrl: String,
})

module.exports = Card