var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

var User = module.exports = mongoose.model('User', schema);

//REGISTER USER
module.exports.addUser = function(newUser, callback){
    let userToAdd = new User({
        username: newUser.username,
        password: newUser.password,
        email: newUser.email
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userToAdd.password, salt, (err, hash) => {
            if(err) throw err;
            userToAdd.password = hash;
            userToAdd.save(callback);
        });
    });
}
//GET ALL USERS
module.exports.getAllUsers = function(callback){
    User.find({}, callback);
}
//GET USER BY USERNAME
module.exports.getUserByUsername = function(username, callback){
    const query = { username : username };
    User.findOne(query, callback);
}
//GET USER BY ID
module.exports.getUserById = function(id, callback){
    const query = { _id: id };
    User.findById(query, callback);
}
//COMPARE PASSWORD
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash,(err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}
