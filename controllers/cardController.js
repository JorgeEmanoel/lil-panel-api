const User = require('../models/User')

module.exports = class panelController {
  static async store(req, res) {
    const { name, backgroundColor, backgroundUrl, textColor, url, panelId } =
      req.body

    if (!name || !panelId) {
      return res.status(400).send({
        message: 'Insuficient data',
      })
    }

    const namespace = req.user.namespaces.filter(
      (n) => !!n.panels.id(panelId)
    )[0]

    if (!namespace) {
      return res.status(404).send({
        message: 'Panel not found',
      })
    }

    const panel = namespace.panels.id(panelId)

    panel.cards.push({ name, backgroundColor, backgroundUrl, url, textColor })

    await req.user.save()
    return res.status(201).send({
      namespaces: req.user.namespaces,
    })
  }

  static async delete(req, res) {
    const {id} = req.params

    const namespace = req.user.namespaces.filter(
      (n) => !!n.panels.filter(p => !!p.cards.id(id)).length
    )[0]

    if (!namespace) {
      return res.status(404).send({
        message: 'Card not found',
      })
    }

    const panel = namespace.panels.filter(p => !!p.cards.id(id))[0]

    if (!panel) {
      return res.status(404).send({
        message: 'Card not found',
      })
    }

    panel.cards.id(id).remove()

    await req.user.save()
    return res.status(200).send({
      message: 'Card deleted'
    })
  }

  static async update(req, res) {
    const {id} = req.params

    const namespace = req.user.namespaces.filter(
      (n) => !!n.panels.filter(p => !!p.cards.id(id)).length
    )[0]

    if (!namespace) {
      return res.status(404).send({
        message: 'Card not found',
      })
    }

    const panel = namespace.panels.filter(p => !!p.cards.id(id))[0]

    if (!panel) {
      return res.status(404).send({
        message: 'Card not found',
      })
    }
    
    const card = panel.cards.id(id)
    
    if (!card) {
      return res.status(404).send({
        message: 'Card not found',
      })
    }

    const { name, backgroundColor, backgroundUrl, textColor, url } =
      req.body

    if (name) {
      card.name = name
    }
    
    if (backgroundColor) {
      card.backgroundColor = backgroundColor
    }
    
    if (backgroundUrl) {
      card.backgroundUrl = backgroundUrl
    }
    
    if (textColor) {
      card.textColor = textColor
    }
    
    if (url) {
      card.url = url
    }
    
    await req.user.save()

    return res.status(200).send({
      message: 'Card deleted'
    })
  }
}
