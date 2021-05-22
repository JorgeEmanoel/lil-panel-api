const User = require('../models/User')

module.exports = class panelController {
  static async store(req, res) {
    const {name, namespaceId} = req.body

    if (!name || !namespaceId) {
      return res.status(400).send({
        message: 'Insuficient data',
      })
    }

    const namespace = req.user.namespaces.id(namespaceId)

    if (!namespace) {
      return res.status(404).send({
        message: 'Namespace not found',
      })
    }

    namespace.panels.push({ name })

    await req.user.save()
    return res.status(201).send({
      namespaces: req.user.namespaces,
    })
  }
}
