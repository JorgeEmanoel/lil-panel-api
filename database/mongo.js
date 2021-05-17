const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWD,
    })
}