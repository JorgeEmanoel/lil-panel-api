const { Schema } = require('mongoose')
const Card = require('./Card.js')

const Panel = new Schema({
  name: String,
  cards: [Card]
})

module.exports = Panel