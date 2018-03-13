const express = require('express');
const usuarioController = require('../controllers/login');
//const login = require('../controllers/login')
const router = express.Router();

router.use(usuarioController.auth)

//router.get('/', usuarioController.getAllUsers);
router.get('/:id', usuarioController.getUser);
router.get('/query/:str', usuarioController.searchUsers);
//router.get('/new', usuarioController.createUserView);
router.get('/:id/pedidos', usuarioController.userPedido);
router.get('/:id/pedido/:idPedido', usuarioController.userPedidoEspecifico);
/*
router.post('/:id', usuarioController.modifyUser);
//router.post('/new', usuarioController.createUser);
router.post('/:id/:pedido/prods', usuarioController.createUser);
router.post('/:id/:pedido/addProd/:canti/:idProd', usuarioController.createUserView);

router.delete('/:id', usuarioController.deleteUser);
router.delete('/:id/:pedido/prods/delete/:idProd', usuarioController.createUser);
*/
module.exports = router;