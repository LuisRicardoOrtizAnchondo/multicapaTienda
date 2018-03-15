const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Pedido = new Schema({
    username: {type: String, ref: 'Usuario'},//{type: Schema.ObjectId, ref: 'Usuario'},
    total: {type: Number, required: true},
    iva: {type: Number, required: true},
    subTotal: {type: Number, required: true},
});

Pedido.plugin(passportLocalMongoose);
module.exports = mongoose.model('Pedido', Pedido);