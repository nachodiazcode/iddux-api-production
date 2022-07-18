const express = require('express')

const log = require('./../utils/logger')
const User = require('./../models/Users')

function getUser ({
    username: username,
    id: id
}) {
    if (username) return User.findOne({username: username})
    if (id) return User.findById(id)
    throw new Error(`Función obtener el usuario del controlador 
    fue llamada sin especificar usuario, o id`)
}

function createUser(user, hashedPassword) {
    return new User({
        ...user,
        password: hashedPassword 
    }).save()
}

function userExists(username, email) {
    return new Promise((resolve, reject) => {
      User.find().or([ { 'username': username }, { 'email': email } ])
        .then(users => {
          resolve(users.length > 0)
        })
        .catch(err => {
          reject(err)
        })
    })
}

module.exports = {
    getUser,
    createUser,
    userExists
}
