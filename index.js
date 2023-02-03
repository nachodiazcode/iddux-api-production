const app = require('./app')
const log = require('./utils/logger')
const config = require('./config/index')

var session = require('express-session')

//connect db
const https = require('https');

async function init() {
    await app.listen(config.puerto)
    log.info(`Leasting on port 30git 00`)
}

init()