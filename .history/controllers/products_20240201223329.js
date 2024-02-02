'use strict'

const path = require('path')
const fs = require('fs')

const Product = require('./../models/Products')
const User = require('./../models/Users')

require('dotenv').config()

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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
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
  let body = req.body;

  const productSaved = new Product({
    title: body.title,
    description: body.description,
    category: body.category,
    code: body.code,
    state: body.state,
    imageURL: req.file.location,
    owner: req.user.username,
  });

  productSaved.save((err, product) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send(product);
    console.log(product);
  });
};


const updateProduct = async (req, res) => {
    const productId = req.params.id
    const { title, description, category, code, state } = req.body
    const imageURL = req.file ? req.file.location : req.body.imageURL
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { title, description, category, code, state, imageURL },
        { new: true }
      )
  
      res.json(updatedProduct)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error actualizando producto' })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const searchProducts = async (req, res) => {
    const { q } = req.query;
    try {
      // Lógica para buscar productos según el término 'q'
      const results = await Product.find({ $text: { $search: q } });
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en la búsqueda de productos' });
    }
  };


module.exports = {
    listProducts,
    listProductById,
    uploadProduct,
    updateProduct,
    deleteProduct,
    searchProducts
}