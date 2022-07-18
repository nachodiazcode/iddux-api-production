const Joi = require('joi')

const bluePrintProduct = Joi.object.key({
        title: Joi.string().max(100).required(),
        price: Joi.Number().positive().precision(2).required(),
        category: Joi.string().max(40).required(),
        currency: Joi.string().length(3).required(),
        imageUrl: Joi.string()
})

function validateProductData (req, res, next) {

    let product_new = req.body

    let result = Joi.validate(product_new, bluePrintProduct, {abortEarly:false, convert: false})
    console.log(result.error)

    if(result.error === null) {
        next()
    } else {
        let validateError = result.error.details.reduce((count, error) => {
            return count + [`${error.messagge}`]
        }, '')
    }

    console.log('producto no pasó la validación', req.body, validateError)

}

module.exports = validateProductData
