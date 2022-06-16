const mongoose = require('mongoose')

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose