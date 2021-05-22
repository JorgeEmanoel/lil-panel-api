const User = require('../models/User')
const toSlug = require('../helpers/toSlug')

module.exports = class namespaceController {
  static async index(req, res) {
    return res.status(200).send({
      namespaces: req.user.namespaces,
    })
  }

  static async store(req, res) {
    const {name, visibility} = req.body

    if (!name || !visibility) {
      return res.status(400).send({
        message: 'Insuficient data',
      })
    }

    const slug = toSlug(name)

    if (visibility === 'public') {
      const namespace = await User.find({
        'namespaces.slug': slug,
        'namespaces.visibility': visibility,
      })

      if (namespace.length) {
        return res.status(422).send({
          message: 'This name has been already taken by another public namespace',
        })
      }
    }

    req.user.namespaces.push({
      name,
      visibility,
      slug,
    })

    await req.user.save()
    return res.status(201).send({
      namespaces: req.user.namespaces,
    })
  }

  static async destroy(req, res) {
    const {id} = req.params

    if (!req.user.namespaces.id(id)) {
      return res.status(404).send({
        message: 'Namespace not found',
      })
    }

    req.user.namespaces.id(id).remove()

    await req.user.save()
    return res.status(200).send({
      namespaces: req.user.namespaces,
    })
  }

  static async show(req, res) {
    const {slug} = req.params

    const user = await User.findOne(
      {'namespaces.slug': slug},
      'namespaces'
    )

    if (!user) {
      return res.status(404).send({
        message: 'Namespace not found',
      })
    }

    const namespace = user.namespaces.filter(n => n.slug === slug)[0]

    if (
      namespace.isPrivate() &&
      (!req.user || !req.user.namespaces.id(namespace._id))
    ) {
      return res.status(404).send({
        message: 'Namespace not found',
      })
    }

    return res.status(200).send({
      namespace,
    })
  }
}
