const app = require('./app')
const log = require('./utils/logger')
const config = require('./config/index')

var session = require('express-session')

var port = 4000 

//connect db
const https = require('https');

app.get('/', (req, res) => {
    res.send(`<h1>Corriendo un API en Vercel yeeeeei</h1> 🥳`)
  })


async function init() {
    await app.listen(config.puerto)
    log.info(`Leasting on port `+port)
}

init()