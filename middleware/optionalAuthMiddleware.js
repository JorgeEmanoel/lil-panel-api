const User = require('../models/User')

module.exports = async (req, res, next) => {
  const token = req.get('Authorization')

  const user = await User.findOne({ token })

  if (user) {
    req.user = user
  }

  next()
}
