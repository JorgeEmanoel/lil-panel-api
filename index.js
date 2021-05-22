const app = require('express')()
require('dotenv').config()
require('./database/mongo.js')()
app.use(require('body-parser').json())
app.use(require('cors')())
const userController = require('./controllers/userController.js')
const namespaceController = require('./controllers/namespaceController.js')
const panelController = require('./controllers/panelController.js')
const authMiddleware = require('./middleware/authMiddleware.js')
const optionalAuthMiddleware = require('./middleware/optionalAuthMiddleware.js')

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'lil-panel-api v1.0.0',
  })
})

app.post('/register', userController.register)
app.post('/login', userController.login)

app.get('/namespaces', authMiddleware, namespaceController.index)
app.post('/namespaces', authMiddleware, namespaceController.store)
app.delete('/namespaces/:id', authMiddleware, namespaceController.destroy)
app.get('/namespaces/:slug', optionalAuthMiddleware, namespaceController.show)

app.post('/panels', authMiddleware, panelController.store)

app.listen(process.env.APP_PORT, () => {
  console.log('lil-panel-api online on port ' + process.env.APP_PORT)
})