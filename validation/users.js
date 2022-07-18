const Joi = require('@hapi/joi')
const log = require('./../utils/logger')

const bluePrintUser = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required() , 
    email:    Joi.string().email().required(),
    password:  Joi.string().min(6).max(200).required()
})

const bluePrintLoginRequest = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

let validateUser = (req, res, next ) => {

  const result = bluePrintUser.validate(req.body, {abortEarly: false, convert: false})

  if (result.error === null ) {
      next()
  } else {
      log.info("Producto falló la validación", result.error.details.map(error => error.message))
      res.status(400).send(`Información del usuario no cumple con los requisitos. 
      El nombre usuario debe ser alfanúmerico y tener entre 3 y 30 carácateres. la contraseña debe tener
      entre 6 y 200 carácteres. Asegurate de que el correo sea válido`)
  }
}

let validateLogin = ( req, res, next) => {

    const result = bluePrintLoginRequest.validate(req.body, {abortEarly: false, convert: false})

    if( result.error === null ) {
        next()
    } else {
        res.status(400).send(`Login Falló ! Debes especificar el username y la contraseña del usuario. Ambos
        deben ser cadenas de texto `)
    }

}

module.exports = {
    validateUser,
    validateLogin
} 