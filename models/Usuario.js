const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Usuario = new Schema({
        //_id: Schema.ObjectId,
        //username: {type: String, required: true,  index: { unique: true }},
        username: {type: String, required: true},
        password: {type: String},/*,
        email: String,
        verified: Boolean,
        role: {type: String, default: 'customer'}*/
        pedidos:[{type: Schema.ObjectId, ref: 'Pedido'}]
});

//Usuario.plugin(passportLocalMongoose);
module.exports = mongoose.model('Usuario', Usuario);
