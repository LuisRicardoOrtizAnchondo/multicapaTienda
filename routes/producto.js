const express = require('express');
const productoController = require('../controllers/producto');
const login = require('../controllers/login');
const router = express.Router();

//router.use(login.auth)
//Tarea
router.get('/', productoController.getAllProducts);
router.get('/pagination/:page/:size', productoController.getProducts);
router.get('/id/:id', productoController.getOneProduct);
router.get('/query/:str', productoController.searchProducts);
//router.get('/new', productoController.createProductView);

router.put('/:id', productoController.modifyProduct);
router.put('/query/:str', productoController.searchProductsModify);

router.post('/new', productoController.createProduct);
router.post('/query/:str', productoController.searchProducts);

router.delete('/', productoController.deleteAllProducts);
router.delete('/:id', productoController.deleteProduct);
router.delete('/query/:str', productoController.searchProductsDelete);
module.exports = router;
