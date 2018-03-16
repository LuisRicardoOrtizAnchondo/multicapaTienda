const express = require('express');
const usuarioController = require('../controllers/login');
const router = express.Router();
const passport = require('passport');
//router.use(usuarioController.auth)

//router.get('/', usuarioController.getAllUsers);
router.get('/login', usuarioController.loginView);
router.get('/id/:id', usuarioController.getUser);
router.get('/query/:str', usuarioController.searchUsers);
//router.get('/new', usuarioController.createUserView);
router.get('/id/:id/pedidos', usuarioController.userPedido);
router.get('/id/:id/pedidos/:idPedido', usuarioController.userPedidoEspecifico);
router.get('/id/:id/pedidos/:idPedido/addProduct/:canti/:idProd', usuarioController.userAddStuff);
router.get('/register', usuarioController.registerView);
router.get('/', usuarioController.index);
router.post('/register', usuarioController.register);

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});


/*
router.post('/:id', usuarioController.modifyUser);
//router.post('/new', usuarioController.createUser);
router.post('/:id/:pedido/prods', usuarioController.createUser);
router.post('/:id/:pedido/addProd/:canti/:idProd', usuarioController.createUserView);

router.delete('/:id', usuarioController.deleteUser);
router.delete('/:id/:pedido/prods/delete/:idProd', usuarioController.createUser);
*/
module.exports = router;