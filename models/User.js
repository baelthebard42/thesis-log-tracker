var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs');   //for encrypting password with hash

//Models
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    
  },
  userstatus: {
    type: String,
    required: true,
  },
  activateStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetToken: {
    type: String,
    default: ''
  }
})

//Methods to encrypt and decrypt password
//synchronous function
UserSchema.methods.hashPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = function(password, hash){
  return bcrypt.compareSync(password, hash)
}

var User = module.exports = mongoose.model('User', UserSchema, 'users');
