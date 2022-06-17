const express = require('express')
const cors = require('cors')
const server = express()

server.use(cors())
server.use(express.json());

const routes = require('./routes/routes');
server.use('/', routes);

server.listen(process.env.PORT || 3333, () => {
    console.log('API ONLINE!')
})