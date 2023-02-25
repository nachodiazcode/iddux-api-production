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
        dirname: '/',
        acl: 'public-read',
        bucket: 'registralo',
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_KEY,
        metadata: function (req, file, cb) {
            console.log(req.body)
            cb(null, Object.assign({}, req.body));
        },
        key: function (req, file, cb) {
            console.log(req.body)
            cb(null, uuidv4() + path.basename(file.originalname));
        },
        filename: function(req, file,cb){
            cb(null, `${file.filename} ${Date.now()}.${file.mimetype.split('/')[1]}`)
        }
    })
})

//ruta para obtener productos
productRouter.get('/products' , productController.listProducts)
productRouter.get('/product/:id', productController.listProductById)
productRouter.post('/products/upload', [jwtAuthenticate], uploadImageS3.single('imageURL'),
productController.uploadProduct )

module.exports = productRouter ;