const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Usuario = new Schema({
    username: String,
    password: String,
    email: String,
    verified: Boolean,
});

Usuario.plugin(passportLocalMongoose);
module.exports = mongoose.model('Usuario', Usuario);
