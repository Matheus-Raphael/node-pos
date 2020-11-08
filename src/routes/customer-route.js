const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer-controller');

//Rotas para Customer
//POST => localhost:3000/api/customer/
router.post('/', customerController.customerRegister);

//Post=> localhost:3000/api/customers para receber um Token
router.post('/auth', customerController.authenticate);

//GET All => localhost:3000/api/customer/
router.get('/', customerController.getAll);

//GETById => localhost:3000/api/customer/1
router.get('/:customerId',  customerController.getById);

//PUT => localhost:3000/api/customer/ID
router.put('/:customerId', customerController.put);

//Delete => localhost:3000/api/customer/ID
router.delete('/:customerId', customerController.delete);

module.exports = router;