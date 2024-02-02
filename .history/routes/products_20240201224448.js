const express =  require('express')
const app = express()

const passport = require('passport')
const productRouter = express.Router()

const log = require('./../utils/logger')
const Product = require('./../models/Products')
const {validateProducts} = require('./../validation/products')
const productController = require('./../controllers/products')
const authJWT = require('./../libs/auth')
const cors = require('cors');

const jwtAuthenticate = passport.authenticate('jwt', {session: false})

app.use(passport.initialize());
app.use(passport.session());
passport.use('jwt',authJWT)
require('dotenv').config()

const fs = require('fs')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const  { v4: uuidv4 } = require('uuid')
const config = require('./../config')
const path = require('path')
const s3 = new aws.S3()

app.use(cors());

const uploadImageS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'iddux-images',
      acl: 'public-read',
      metadata: function(req, file, cb) {
        cb(null, Object.assign({}, req.body));
      },
      key: function(req, file, cb) {
        cb(null, uuidv4() + file.originalname);
      }
    }),
    limits: { fileSize: Infinity },
    fileFilter: function(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|webp|avif|gif|bmp)$/i)) {
        return cb(new Error('Solo se permiten imágenes'));
      }
      cb(null, true);
    }
  });
  

productRouter.get('/products' , productController.listProducts)
productRouter.get('/products', productController.searchProducts)
productRouter.get('/product/:id', productController.listProductById)
productRouter.post('/products/upload', [jwtAuthenticate], uploadImageS3.single('imageURL'),productController.uploadProduct)
productRouter.put('/product/:id', [jwtAuthenticate], uploadImageS3.single('imageURL'), productController.updateProduct)
productRouter.delete('/product/:id', productController.deleteProduct)



module.exports = productRouter ;