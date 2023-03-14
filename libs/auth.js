
const express =  require('express')
const app = express()
const passportJWT = require('passport-jwt')
const passport = require('passport')
const config = require('./../config')
const _ = require('underscore')
const userController = require('./../controllers/users')
const log = require('./../utils/logger')

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id,(err, user)=>{
        done(err, user);
    })
})

let jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = new passportJWT.Strategy( jwtOptions, (jwtPayload, next) => {
    userController.getUser({id: jwtPayload.id})
        .then(user => {
            if (!user) {
                log.info(`JWT token no es válido. Usuario con id ${jwtPayload.id} no existe`)
                next(null, false)
                return 
            }

            log.info(`Usuario ${user.username} suministro un token valido. Autenticación completada`)

            next(null, {
                username: user.username,
                id:user.id 
            })
        })
        .catch(err => {
            log.error("Error ocurrió al tratar de validar un token.", err)
            next(null, false)
        })
})

