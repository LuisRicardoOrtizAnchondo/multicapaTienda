const express = require('express');
const productoController = require('../controllers/producto');
const router = express.Router();

router.use(login.auth)
//Tarea
router.get('/', productoController.getAllProducts);
router.get('/:page/:size', productoController.getProducts);
router.get('/:id', productoController.getOneProduct);
router.get('/query/:str', productoController.searchProducts);

router.post('/:id', productoController.modifyProduct);

router.delete('/', productoController.deleteAllProducts);
router.delete('/:id', productoController.deleteProduct);

router.get('/new', productoController.newproducto);
router.post('/new', productoController.saveProducto);
router.get('/modify/:id', productoController.modifyproductoView);
router.post('/modify', productoController.modifyproducto);
router.get('/:page/:size', productoController.render);

module.exports = router;
