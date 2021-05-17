const { Schema } = require('mongoose')
const Panel = require('./Panel.js')

const Namespace = new Schema({
  name: String,
  slug: String,
  visibility: String,
  panels: [Panel]
})

Namespace.methods = {
  isPrivate() {
    return this.visibility === 'private'
  },
  isPublic() {
    return this.visibility === 'public'
  },
}

module.exports = Namespace