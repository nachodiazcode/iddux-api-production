const AddProductController = require('../controllers/cart')
const express = require('express')

const addProductController = express.Router()

addProductController.post('/cart/:id', AddProductController.buyProduct)
addProductController.get('/cart/', AddProductController.getProduct)

module.exports = addProductController