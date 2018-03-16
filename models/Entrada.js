const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Entrada = new Schema({
    Pedido: {type: Schema.ObjectId, ref: 'Usuario'},
    Producto: {type: Schema.ObjectId, ref: 'Producto'},
    cantidad: Number,
    importe: Number
});

//Entrada.plugin(passportLocalMongoose);
module.exports = mongoose.model('Entrada', Entrada);
