const Product = require('./../models/Products')
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
const { description } = require('@hapi/joi/lib/types/alternatives')

const s3 = new AWS.S3()

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_KEY
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true)
    } else {
        cb(new Error ('Tipo de Archivo Invalido'), false)
    }
}

const getProduct = async (req, res) => {
   const {id} = req.params;
   const product = await Product.findById(id);

   return res.json(product)
}

const getProducts = (req, res) => {
    Product.find({}).exec((err, data) => {
        return res.json(data)
    })
}

const uploadProduct = (req, res) => {

    var product = new Product();
    var params = req.body ;

    product.title = params.title;
    product.description = params.description;
    product.category = params.category;
    product.code = params.code;
    productstate =params.state;
    imageURL = req.file.location;
    owner =req.user.username;

    product.save((err, product) => {

        if(err){
            res.status(500).send({message:"Error al guardar el producto"})
        }else{
            if(!product){
                res.status(404).send({message:"El producto no ha sido guardado"})
            }else{
                res.status(201).send({product});
                console.log(product)
            }
        }
    });
}


module.exports = {
    getProducts,
    getProduct,
    uploadProduct,

}