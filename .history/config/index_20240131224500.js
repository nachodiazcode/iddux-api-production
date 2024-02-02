
require('dotenv').config()
const https = require('https');
const ambiente = process.env.NODE_ENV || 'development'

const configuracionBase = {
  jwt: 'esto_es_secreto',
  puerto: process.env.PORT || 'development',
  s3: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_KEY
  }
}
  
let configuracionDeAmbiente = {}

switch (ambiente) {
  case 'dev':
  case 'development':
    configuracionDeAmbiente = require('./dev')
    break
  case 'produccion':
  case 'prod':
    configuracionDeAmbiente = require('./prod')
    break
  default:
    configuracionDeAmbiente = require('./dev')
}

console.log({ 
  ...configuracionBase,
  ...configuracionDeAmbiente
})

module.exports = {
    ...configuracionBase,
    ...configuracionDeAmbiente
}