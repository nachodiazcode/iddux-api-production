const mongoose = require('mongoose')
const Users = require('./Users')
const Product = require("./Products")

const Schema = mongoose.Schema ;

const cartSchema = new Schema({

    date: {
        type: Date,
        default: Date.now
    },

    title: {
        type: String
    },

    price: {
        type: Number
    },

    total:{
        type: Number
    },

    products: {
        type: Schema.Types.ObjectId,
        ref : "Products"
    },
    
    ownerProduct : {
        type: String
    }


}, {
    timestamps:false,
    versionKey: false
})
module.exports = mongoose.model('Sale', cartSchema )