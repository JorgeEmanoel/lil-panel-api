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

  static async show(req, res) {
    const {id} = req.params

    const namespace = req.user.namespaces.filter(n => !!n.panels.id(id))[0]

    if (!namespace) {
      return res.status(404).send({
        message: 'Panel not found',
      })
    }

    const panel = namespace.panels.id(id)

    if (!panel) {
      return res.status(404).send({
        message: 'Panel not found',
      })
    }
    
    return res.status(200).send({
      panel,
    })
  }
}
