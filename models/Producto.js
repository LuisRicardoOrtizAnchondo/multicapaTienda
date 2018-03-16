const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Producto = new Schema({
    nombre: {type: String, required: true, unique: true},
    precio: {type: Number, required: true}
});

//Producto.plugin(passportLocalMongoose);
module.exports = mongoose.model('Producto', Producto);
/*var Producto = {
    nombre: 'Chicharrones',
    precio: 30
}*/