const app = require('./app')
const log = require('./utils/logger')
const express = require('express')

require('dotenv').config()

const PUERTO = 3000 || process.env.PORT ;


const api = express();

api.listen(PORT => console.log(`Corriendo en el puerto ${PUERTO}`) )
