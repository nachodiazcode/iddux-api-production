const express = require('express');
const mongoose = require('mongoose');
const Cart = require('./../models/Cart');
const Product = require('./../models/Products');
const config = require('./../config');

let getSales = (req, res) => {
  Cart.find({})
    .populate('product')
    .exec((err, product) => {
      res.json(product);
      console.log(product);
    });

  let user = req.user.username;
};

module.exports = {
  getSales,
};
