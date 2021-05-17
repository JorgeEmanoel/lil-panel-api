const User = require('../models/User')
const MD5 = require('crypto-js/md5')
const SHA256 = require('crypto-js/sha256')

module.exports = class userController {
  static async register(req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Insuficient data',
      })
    }

    const {username, password, passwordConfirmation, name, email} = req.body

    if (!username || !password || !passwordConfirmation || !email) {
      return res.status(400).send({
        message: 'Insuficient data',
      })
    }

    if (password !== passwordConfirmation) {
      return res.status(400).send({
        message: 'The password does not match',
      })
    }

    const users = await User.find({
      username,
    })

    if (users && users.length) {
      return res.status(422).send({
        message: 'The selected username has already been taken',
      })
    }

    const user = new User({
      username,
      name,
      email,
      password: MD5(password),
      token: SHA256((new Date).toString())
    })

    await user.save()

    return res.status(200).send({
      user,
    })
  }

  static async login(req, res) {
    const {username, password} = req.body

    if (!username || !password) {
      return res.status(400).send({
        message: 'Insuficient data',
      })
    }

    const user = await User.findOne({
      username: username,
      password: MD5(password).toString(),
    })

    if (!user) {
      return res.status(422).send({
        message: 'Incorrect username or password',
      })
    }

    user.token = SHA256((new Date).toString())

    return res.status(200).send({
      user,
    })
  }
}