const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Producto = new Schema({
    nombre: String,
    precio: Number
});

Producto.plugin(passportLocalMongoose);
module.exports = mongoose.model('Producto', Producto);