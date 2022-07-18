const Joi = require('@hapi/joi')
const log = require('./../utils/logger')

const blueprintProduct = Joi.object({ 
    title: Joi.string().min(4).max(100).required(),
    price: Joi.number().positive().precision(2).required(),
    currency: Joi.string().length(3).uppercase().required(),
    imageURL: Joi.string(),
    category: Joi.string()
})


let validateProducts = (req, res, next ) => {

  const result = blueprintProduct.validate(req.body, {abortEarly: false, convert: false})

  if (result.error === null ) {
      next()
  } else {
    let errorDeValidacion = result.error.details.reduce((acc, error) => {
        return acc + `[${error.message}]`
        }, '')
        log.warn('El siguiente producto no pasó la validación :' , req.body, errorDeValidacion)
        res.status(400).send(`El producto en el body debe especificar el titulo, precio y moneda. Errores en su request: ${errorDeValidacion}`)
        
  }
}

module.exports = {
    validateProducts
} 