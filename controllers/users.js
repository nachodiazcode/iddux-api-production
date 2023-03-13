'use strict';

const User = require('./../models/Users')
const bcrypt = require('bcrypt')

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

function deleteUser(userId) {
    return User.findByIdAndDelete(userId)
      .then((deletedUser) => {
        if (!deletedUser) {
          throw new Error('No se encontró el usuario a eliminar');
        }
        return deletedUser;
      })
      .catch((error) => {
        throw new Error(`Error al eliminar usuario: ${error.message}`);
      });
}

function updateUser(userId, username, password) {
    if (password && password.length >= 8) {
      return bcrypt.hash(password, 10)
        .then(hashedPassword => {
          return User.findByIdAndUpdate(userId, { username: username, password: hashedPassword }, { new: true })
            .then(updatedUser => {
              if (!updatedUser) {
                throw new Error('No se encontró el usuario a actualizar');
              }
              return updatedUser;
            })
            .catch(error => {
              throw new Error(`Error al actualizar el usuario: ${error.message}`);
            });
        });
    } else {
      throw new Error('La nueva contraseña debe tener al menos 8 caracteres');
    }
  }



module.exports = {
    updateUser,
    getUser,
    createUser,
    userExists,
    deleteUser
    
}
