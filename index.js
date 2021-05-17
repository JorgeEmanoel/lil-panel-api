const app = require('express')()
require('dotenv').config()
app.use(require('cors')())
require('./database/mongo.js')()

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'lil-panel-api v1.0.0',
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log('lil-panel-api online on port ' + process.env.APP_PORT)
})