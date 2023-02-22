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
    category: {
        type: String
    },
    code: {
        type: String
    },
    imageURL: {
        type: String
    },
    state:{
        type: String
    },
    owner : {
        type: String
    },
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Product', productSchema)