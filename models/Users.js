const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const Products = require('./Products')

const userSchema = new Schema({
   username: {
      type: String
   },
   email: {
      type: String
   },
   password: {
      type: String
   }
})

userSchema.methods.encryptPassword = (password) => {
   return  bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
   return bcrypt.compareSync(password, this.password)
}


module.exports = model('User', userSchema)