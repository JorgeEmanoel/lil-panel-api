const User = require('../models/User')

module.exports = async (req, res, next) => {
  const token = req.get('Authorization')

  if (!token) {
    return res.status(401).send()
  }

  const user = await User.findOne({ token })

  if (!user) {
    return res.status(401).send()
  }

  req.user = user
  next()
}
