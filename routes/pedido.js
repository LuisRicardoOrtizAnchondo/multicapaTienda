const express = require('express');
const login = require('../controllers/login')
const router = express.Router();
const pedidoController = require('../controllers/pedido');
router.use(login.auth)
/*
router.get('/', pedidoController.getAllProducts);
router.get('/:page/:size', pedidoController.getProducts);
router.get('/:id', pedidoController.getOneProduct);
router.get('/query/:str', pedidoController.searchProducts);
router.get('/new', pedidoController.createProductView);

router.post('/:id', pedidoController.modifyProduct);
router.post('/new', pedidoController.createProduct);

router.delete('/', pedidoController.deleteAllProducts);
router.delete('/:id', pedidoController.deleteProduct);
*/

module.exports = router;