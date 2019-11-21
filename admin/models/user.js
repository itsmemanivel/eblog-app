const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

// User Schema
const UserSchema = mongoose.Schema ({
  
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imageURL :{
    type: String,
    required: true
  
  },
  createdtime :{
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('users', UserSchema);

module.exports.getUserById = function(id, callback) {
  query = ({ _id : id })
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getUsers = function (username, callback){
      User.find({
        username: {
            $ne: username
        }
    }).exec( callback );
}