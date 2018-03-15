//const entradaController = require('../controllers/entrada');
const mongoose = require('mongoose');
const loginController = require('../controllers/login');
const pedidoController = require('../controllers/pedido');
const producto = require('../controllers/producto');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../app');
const www = require('../bin/www');
const UsuarioMock = require('../models/Usuario');
const PedidoMock = require('../models/Pedido');
const ProductoMock = require('../models/Producto');
const EntradaMock = require('../models/Entrada');
let mongooseTest = require('mongoose-test');
const colors = require('colors');
//https://gist.github.com/dylants/a0aa6f58bb0926c451e0
/*let UsuarioMock = mongoose.model('UsuarioMock', new mongoose.Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: String,
    verified: Boolean,
    role: {type: String, default: 'customer'}
}));*/

/*
var dbURI    = 'mongodb://localhost/multicapa-mock'
    , should   = require('chai').should()
    , mongoose = require('mongoose')
    , Dummy    = mongoose.model('Dummy', new mongoose.Schema({a:Number}))
    , clearDB  = require('mocha-mongoose')(dbURI)
;*/


//module.exports = mongoose.model('UsuarioMock', UsuarioMock);

//let loginView = loginController.loginView();
//console.log(loginView);
let req = new Object();
let res = new Object();
let body = new Object();
let params = new Object();
req.body = body;
req.params = params;
req.params.id = 'richi';

res.redirect = null;

let usuario = req.params.id;
//console.log(req);
//let getUserResult = loginController.getUser(req, res);
//console.log('Resultadini::!');
//console.log(getUser);

/*
describe('loginController.loginView();', function(){
   it('You should be logged in', function(){
        assert.equal();
   });
});
*/


describe('getUserTest', function(){
    it('Pasa la prueba si devuelve un usuario', function(done){
        //console.log('REsutlado::saSAsadasdasdasdasdasdasd'.rainbow + loginController.getUser(req, res));
        //console.log(loginController.getUser(req, res));
        let result = loginController.getUser(req, res);
        console.log(loginController.getUser(req, res));
        assert.equal(result, UsuarioMock);
        done();
    });
});


describe('UsuarioMock', function() {
    it('Pasa la prueba si username/password/_id están vacíos', function(done) {
        let um = new UsuarioMock();
        um.validate(function(err) {
            //console.log('Validando...');
            //console.log(err.errors);
            expect(err.errors).to.exist;
            done();
        });
    });
    it('Pasa la prueba si regresa un usuario ', function(done) {
        let um = new UsuarioMock({_id: 0},{username: 'Luis'},{password: 'Doe'},{email: 'mock@mock.com'});
        um.validate(function(resultado) {
            //console.log('Validando...');
            //console.log(resultado);
            expect(resultado.errors).to.not.exist;
            done();
        });
    });
});

describe('ProductoMock', function() {
    it('Pasa la prueba si regresa error (Por los campos required)', function(done) {
        let pm = new ProductoMock();
        pm.validate(function(err) {
            //console.log('Validando...');
            //console.log(err.errors);
            expect(err.errors).to.exist;
            done();
        });
    });
    it('Pasa la prueba si regresa un producto', function(done) {
        let pm = new ProductoMock({_id: 0},{nombre: 'Papas'},{precio: 10});
        pm.validate(function(resultado) {
            //console.log('Validando...');
            //console.log(resultado);
            expect(resultado.errors).to.not.exist;
            done();
        });
    });
});

describe('PedidoMock', function() {
    it('Pasa la prueba si regresa error (Por los campos required)', function(done) {
        let pm = new PedidoMock();
        pm.validate(function(err) {
            //console.log('Validando...asdsasdsds');
            //console.log(err.errors);
            expect(err.errors).to.exist;
            done();
        });
    });
    it('Pasa la prueba si regresa un producto', function(done) {
        let pm = new PedidoMock({total: 115},{iva: 15}, {subTotal: 100});
        pm.validate(function(resultado) {
            //console.log('Validando...');
            //console.log(resultado);
            expect(resultado.errors).to.not.exist;
            done();
        });
    });
});

describe('EntradaMock', function() {
    it('Pasa la prueba si regresa error (Por los campos required) ', function(done) {
        let em = new EntradaMock();
        em.validate(function(err) {
            //console.log('Validando...');
            //console.log(err.errors);
            expect(err.errors).to.exist;
            done();
        });
    });
    it('Pasa la prueba si regresa un producto', function(done) {
        let em = new EntradaMock({total: 115},{iva: 15}, {subTotal: 100});
        em.validate(function(resultado) {
            //console.log('Validando...');
            //console.log(resultado);
            expect(resultado.errors).to.not.exist;
            done();
        });
    });
});



describe('userPedidoTest', function() {
    it('Pasa la prueba si regresa los pedidos', function(done){
        //console.log('REsutlado::saSAsadasdasdasdasdasdasd'.rainbow + loginController.getPedido(req, res));
        //console.log(loginController.getPedido(req, res));
        let result = loginController.userPedido(req, res);;
        console.log(loginController.userPedido(req, res));
        assert.equal(result[0], PedidoMock);
        done();
    });

});

describe('userPedidoEspecificoTest', function() {
    it('Pasa la prueba si regresa el pedido con id especificado', function(done){
        //console.log('REsutlado::saSAsadasdasdasdasdasdasd'.rainbow + loginController.getPedido(req, res));
        //console.log(loginController.getPedido(req, res));
        let result = loginController.userPedidoEspecifico(req, res);
        assert.equal(result, PedidoMock);
        done();
    });

});

describe('Register', function() {
    it('Pasa la prueba si regresa el pedido con id especificado', function(done){
        //console.log('REsutlado::saSAsadasdasdasdasdasdasd'.rainbow + loginController.getPedido(req, res));
        //console.log(loginController.getPedido(req, res));
        let result = loginController.userPedidoEspecifico(req, res);
        console.log(loginController.userPedidoEspecifico(req, res));
        expect(result.res.redirect).to.exist;
        done();
    });

});

describe('Auth', function() {
    it('Pasa la prueba si regresa not_logged', function(done){
        //console.log('REsutlado::saSAsadasdasdasdasdasdasd'.rainbow + loginController.getPedido(req, res));
        //console.log(loginController.getPedido(req, res));
        let result = loginController.auth(req, res);
        console.log(result);
        expect(result.res.redirect).to.exist;
        assert.equal(result, 'not_logged');
        done();
    });

});
