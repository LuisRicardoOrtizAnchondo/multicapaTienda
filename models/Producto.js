const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Producto = new Schema({
    //_id: {type: String, required: true},
    nombre: {type: String, required: true},
    precio: {type: Number, required: true}
});

Producto.plugin(passportLocalMongoose);
module.exports = mongoose.model('Producto', Producto);