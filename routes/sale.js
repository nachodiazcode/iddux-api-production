
const express =  require('express')

const SaleController = require('./../controllers/sale')
const saleRouter = express.Router()

saleRouter.get('/mycart', SaleController.getSales)

module.exports = saleRouter
