const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


var Entrada = new Schema({
    Pedido: {type: Schema.ObjectId, ref: 'Pedido'},
    Producto: {type: Schema.ObjectId, ref: 'Producto'},
    cantidad: Number,
    importe: Number
});

//Entrada.plugin(passportLocalMongoose);
module.exports = mongoose.model('Entrada', Entrada);
/*
var Entrada = new Schema({
    Pedido: '5aac1798f18f96d9b822349c',
    Producto: '5aabf6be1a61ad128125c7b5',
    cantidad: 3,
    importe: 300
});*/