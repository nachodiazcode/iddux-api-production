
const ambiente = process.env.NODE_ENV || 'development'

const configuracionBase = {
  jwt: 'esto_es_secreto',
  puerto: 3000,
  s3: {
    secretAccessKey: 'tb6fMf8qPGRZiDoeD5vrOBu4oUaGabIBepWJVwf3',
    accessKeyId: 'AKIAVBZRGP25VHYSODW7'
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