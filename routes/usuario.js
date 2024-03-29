const express = require('express');
//const usuarioController = require('../controllers/login');
const usuarioController = require('../controllers/usuario');
const router = express.Router();
const passport = require('passport');
const ATTENTION = '-------------ATTENTION-------------';
//router.use(usuarioController.auth)

//router.get('/', usuarioController.getAllUsers);
/*
router.get('/login', usuarioController.loginView);
router.get('/id/:id', usuarioController.getUser);

//router.get('/new', usuarioController.createUserView);

router.get('/id/:id/pedidos/:idPedido', usuarioController.userPedidoEspecifico);
router.get('/id/:id/pedidos/:idPedido/addProduct/:canti/:idProd', usuarioController.userAddStuff);
router.get('/register', usuarioController.registerView);
router.get('/', usuarioController.index);
router.post('/register', usuarioController.register);

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});
*/

router.post('/', usuarioController.saveUser);
router.post('/:id', usuarioController.getUser);

//router.post('/:id/:pedido/addProd/:canti/:idProd', usuarioController.addProduct);
router.get('/:id/addProd/:canti/:idProd', usuarioController.addProduct);


router.put('/:id', usuarioController.modifyUser);
router.put('/query/:str', usuarioController.searchModifyUser);
//router.put('/:id', usuarioController);

router.delete('/', usuarioController.deleteAllUsers);
router.delete('/:id', usuarioController.deleteUser);
router.delete('/query/:str', usuarioController.searchDeleteUser);

router.get('/', usuarioController.getAllUsers);
router.get('/query/:str', usuarioController.searchUsers);
router.get('/pagar/:idPedido', usuarioController.pay);
router.get('/:id/pedidos', usuarioController.userPedido);
router.get('/:id/:pedido/prods', usuarioController.userPedidoProds);
router.get('/:id/:pedido', usuarioController.usuarioPedido);
router.get('/:id', usuarioController.getUser);

//curl -X GET http://localhost:3000/user/Canito/pedidos  -H 'Content-Type: application/json'

router.delete('/:id/:idPedido', usuarioController.deletePedido);
router.delete('/:id/:idPedido/prods/:idProd', usuarioController.deleteProd);

//agregar pedido de un usuario
/*
router.post('/:id', usuarioController.modifyUser);
//router.post('/new', usuarioController.createUser);
router.post('/:id/:pedido/prods', usuarioController.createUser);
router.post('/:id/:pedido/addProd/:canti/:idProd', usuarioController.createUserView);

router.delete('/:id', usuarioController.deleteUser);
router.delete('/:id/:pedido/prods/delete/:idProd', usuarioController.createUser);
*/
module.exports = router;