const { Schema } = require('mongoose')

const Card = new Schema({
  name: String,
  textColor: String,
  url: String,
  backgroundColor: String,
  backgroundUrl: String,
})

module.exports = Card