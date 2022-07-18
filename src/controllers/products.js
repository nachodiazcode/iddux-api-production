const Product = require('./../models/Products')
const Cart = require('./../models/Cart')
const User = require('./../models/Users')

require('dotenv').config()

const path = require('path')

const fs = require('fs')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const  { v4: uuidv4 } = require('uuid')
const config = require('./../config')
const { sample } = require('underscore')

const s3 = new AWS.S3()

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_KEY
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true)
    } else {
        cb(new Error ('Tipo de Archivo Invalido'), false)
    }
}

const listProductById = async (req, res) => {
   const {id} = req.params;
   const product = await Product.findById(id);

   return res.json(product)
}

const listProducts = (req, res) => {
    Product.find({}).exec((err, data) => {
        return res.json(data)
    })
}

const uploadProduct = (req, res) => {

    let body = req.body
 
    const productSaved = new Product({
        title: body.title,
        description: body.description,
        details_product: body.details_product,
        price: body.price,
        category: body.category,
        currency: body.currency,
        email: body.email,
        code: body.code,
        send_dates:body.send_dates,
        quantity: body.count,
        stock: body.stock,
        imageURL: req.file.location,
        owner: req.user.username,
    })

    productSaved.save()

    console.log(productSaved)
}

const addToCart = async (req, res) => {

    const _id = req.params.id;

    const productSaved = new Cart({
        product: _id,
        title: req.body.title,
    }) 

    console.log(productSaved)
    console.log(req.body)
    console.log('Producto Guardado')

}

module.exports = {
    listProducts,
    listProductById,
    uploadProduct,
    addToCart
}
