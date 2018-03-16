const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Pedido = new Schema({
    user: {type: Schema.ObjectId, ref: 'Usuario'},//{type: String, ref: 'Usuario'},//{type: Schema.ObjectId, ref: 'Usuario'},
    total: {type: Number, required: true},
    iva: {type: Number, required: true},
    subTotal: {type: Number, required: true},
    prods: [{
    	prod: {_id: {type: Schema.ObjectId, ref: 'Producto'}}//, nombre: String, canti: Number, importe: Number}
    }]
});

//Pedido.plugin(passportLocalMongoose);
module.exports = mongoose.model('Pedido', Pedido);
/*
var Pedido = {
    username: 'algo',//'alguien@alguien.com',//{type: Schema.ObjectId, ref: 'Usuario'},
    total: 115,
    iva: 15,
    subTotal: 100,
}
*/