const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Pedido = new Schema({
    user: {type: ObjectId, ref: 'Usuario'},
    total: Number,
    iva: Number,
    subTotal: Number,
});

Pedido.plugin(passportLocalMongoose);
module.exports = mongoose.model('Pedido', Pedido);
