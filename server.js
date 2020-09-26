const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Configurar o app para usar o body-parser e transformar as req em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Persistência
const connection_string = "mongodb+srv://matheus:matheus@teste.rln9g.mongodb.net/dbpos?retryWrites=true&w=majority";
mongoose.connect(connection_string,  {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

//Defenir porta onde o server vai responder
const port = process.env.PORT || 3000;

//Definindo as Rotas
const router = express.Router(); //intercepta todas as rotas
const productRoute = require('./src/routes/product-route');
const indexRoute = require('./src/routes/index-route');
const categoryRoute = require('./src/routes/category-route');
const customerRoute = require('./src/routes/customer-route');

//Vincular a aplicação (app) com o motor de rotas
//'/api' é o caminho padrão para as APIs REST
 //rota principal
app.use('/api', indexRoute);

//rota para produto
app.use('/api/produtos/', productRoute);
app.use('/api/categorias/', categoryRoute);
app.use('/api/customer/', customerRoute);

app.listen(port, () => {
    console.log("server is up and runing...on port ", port);
});
