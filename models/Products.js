const mongoose = require('mongoose')
const Users = require('./Users')

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    details_product: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    currency: {
       type: String
    },
    email: {
        type: String
    },
    code: {
        type: String
    },
    send_dates: {
        type: String
    },
    quantity: {
        type: String
    },
    stock: {
        type: Number
    },
    imageURL: {
        type: String
    },
    owner : {
        type: String
    },
    productBuyed: {
        type: Boolean
    },
    comment: {
        type: String
    }
   
}, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Product', productSchema)
