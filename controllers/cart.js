

const express = require('express');
const mongoose = require('mongoose');
const  cookieParser = require('cookie-parser') ;
const    bodyParser = require('body-parser');

const Cart = require("./../models/Cart");
const Products = require("./../models/Products");

const config = require('./../config');


const path = require('path')

const passportJWT = require('passport-jwt')
const app = express()


//passport 
const authJWT = require('./../libs/auth');
const passport = require('passport');
passport.use(authJWT)
const jwtAuthenticate = passport.authenticate('jwt', {session: true})

app.use(passport.initialize());
app.use(passport.session());

const Schema = mongoose.Schema ;

let buyProduct = async ( req, res ) => {

    const _id = req.params.id;

    const productSaved = new Cart({
        products: req.body._id,
        title: req.body.title,
        price: req.body.price,
        total: req.body.total
    }) 

    productSaved.save()

    console.log(productSaved)
    console.log('Producto Guardado')
 
    res.json(productSaved)
 
}

let getProduct = async (req, res) => {
    
    Cart.find({}, function(err, sale){
        Products.populate(sale, {path: "products"}, function(err, products){
            res.status(200).send(sale)
        })
    })
    
    console.log(req.body)
      
}

module.exports = {
    buyProduct,
    getProduct
}