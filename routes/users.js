const express =  require('express')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const _ = require('underscore')
const userController = require('./../controllers/users')

const log = require('./../utils/logger')
const User = require('./../models/Users')

const config = require('./../config')
var session = require('express-session')

const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch')
const {validateUser, validateLogin}  = require('./../validation/users')

//passport 
const authJWT = require('./../libs/auth');
const passport = require('passport');
passport.use(authJWT)

const jwtAuthenticate = passport.authenticate('jwt', {session: false})

const UserRouter = express.Router()

function transformBodyToLowerCase(req, res, next) {
    req.body.username && (req.body.username = req.body.username.toLowerCase())
    req.body.email && (req.body.email = req.body.email.toLowerCase())
    next()
}

UserRouter.post('/user/signup' , (req, res) => {

    let newUser = req.body
    let token =  jwt.sign({_id: newUser._id}, config.jwt.secret)

    userController.userExists(newUser.username, newUser.email) 
        .then(userExists => {
            if (userExists) {
               return  res.status(409).json("El correo ya esta asociado a una cuenta")
               res.json({token:token})
                log.warn(`Email [${newUser.email}] o username [${newUser.username}] ya se encuentran en la base de datos`)
                
            } 

            return bcrypt.hash(newUser.password, 10)
        })

        .catch(err => {
            console.log(err)
        })
        .then((hash) => {
            return userController.createUser(newUser, hash)
                .then(newUser => {
                    return res.status(201).json({token: token}) ,                   
                    log.info(`Usuario ${newUser.username} fue creado Exitósamente`)
                })
        })
        .catch(err => {
            console.log(err)
        })    
})

UserRouter.post('/user/signin', async (req, res) => {

    let userNoAuthenticate = req.body
    let userRegistered
    let correctPassword

    try {
        userRegistered = await userController.getUser({username: userNoAuthenticate.username})
      } catch (err) {
        log.info(`Error ocurrio al tratar de determinar si el usuario ${userNoAuthenticate.username} ya existe`, err)
        res.json("Error ocurrió durante el proceso de login")
      }
    
      if (!userRegistered) {
        log.info(`Usuario [${userNoAuthenticate.username}] no existe. No pudo ser autenticado`)
      }
    
      try {
        correctPassword = await bcrypt.compare(userNoAuthenticate.password, userRegistered.password)
      } catch (err) {
        log.error(`Error ocurrió al tratar de verificar si la contraseña es correcta`, err)
      }
    
      if (correctPassword) {
    
        // GENERAR Y ENVIAR TOKEN
    
        const expiresIn = 24 * 60 * 60
        const username = req.body.username
        
        const token = jwt.sign({
          id: userRegistered.id,
          email: userRegistered.email
        }, config.jwt.secret, {expiresIn: expiresIn})

        console.log(this.token, username)

        console.log(userRegistered)
        
        log.info(`Usuario ${userNoAuthenticate.username} completo autenticación exitosamente`);
        console.log('usuario logueado exitosamente');
        res.json({token:token, username: username, dataUser: userRegistered})
    
      } else {
        log.info(`Usuario ${userNoAuthenticate.username} no completo autenticación. Contraseña Incorrecta`);
        console.log('hubo un error')
      }
})

UserRouter.get('/user/profile', jwtAuthenticate , (req, res) => {

    
    let user = `${req.user.username}`


    res.status(200).send(`Hola ${user} Bienvenido a iddyx `)
})

UserRouter.get('/users/logout', (req, res) => {
    
    let userAuthenticate = req.body

    req.logout();

    localStorage.removeItem('token')
    res.redirect('');

    log.info(`${userAuthenticate.username} ha salido de la aplicación`)
});

module.exports = UserRouter
