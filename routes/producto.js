const express = require('express');
const productoController = require('../controllers/producto');
const login = require('../controllers/login');
const router = express.Router();

router.use(login.auth)
//Tarea
router.get('/', productoController.getAllProducts);
router.get('/:page/:size', productoController.getProducts);
router.get('/:id', productoController.getOneProduct);
router.get('/query/:str', productoController.searchProducts);
//router.get('/new', productoController.createProductView);

router.post('/:id', productoController.modifyProduct);
router.post('/new', productoController.createProduct);

router.delete('/', productoController.deleteAllProducts);
router.delete('/:id', productoController.deleteProduct);

module.exports = router;
