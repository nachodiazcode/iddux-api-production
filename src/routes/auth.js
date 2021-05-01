const userController = require('./../controllers/users')
const express =  require('express')

const auth_router = express.Router()

auth_router.post('/signin', (req, res) => {
    res.send('auth')
})

auth_router.post('/signup' , (req, res) => {
    res.send('signup')
}) 

module.exports = auth_router
