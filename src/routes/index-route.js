const express = require('express');
const router = express.Router();

//Padrão Middleware
//Middleware
router.use(function(req, res, next){
    console.log("Interceptação pelo Middleware ok"); //Log, Validações, Autenticações
    next();
});

router.get('/', (req, res) => res.send("Rota teste ok"));

module.exports = router; 