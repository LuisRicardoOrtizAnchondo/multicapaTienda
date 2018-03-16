const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Pedido = new Schema({
    user: {type: Schema.ObjectId, ref: 'Usuario'},//{type: String, ref: 'Usuario'},//{type: Schema.ObjectId, ref: 'Usuario'},
    total: {type: Number, required: true},
    iva: {type: Number, required: true},
    subTotal: {type: Number, required: true},
    prods: [{
        type: Schema.ObjectId, ref: 'Entrada'
    }]
});

//Pedido.plugin(passportLocalMongoose);
module.exports = mongoose.model('Pedido', Pedido);
/*
var Pedido = {
    username: 'Canito',//'alguien@alguien.com',//{type: Schema.ObjectId, ref: 'Usuario'},
    total: 115,
    iva: 15,
    subTotal: 100,
}
*/