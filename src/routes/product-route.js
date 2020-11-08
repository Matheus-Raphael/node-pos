const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const authService = require('../services/auth-service');

//Rotas para Produto
//POST => localhost:3000/api/produtos/
router.post('/', authService.authorize, productController.post);

//GET All => localhost:3000/api/produtos/
router.get('/', productController.getAll);

//GETById => localhost:3000/api/produtos/1
router.get('/:productId',  productController.getById);

//PUT => localhost:3000/api/produtos/ID
router.put('/:productId', productController.put);

//Delete => localhost:3000/api/produtos/ID
router.delete('/:productId', productController.delete);

module.exports = router;