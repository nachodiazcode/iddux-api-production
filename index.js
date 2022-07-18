const app = require('./app')
const log = require('./utils/logger')
const config = require('./config/index')
const express = require('express')

require('dotenv').config()

const PUERTO = config.port || process.env.PORT ;


const api = express();

api.listen(PORT => console.log(`Corriendo en el puerto ${PUERTO}`) )
