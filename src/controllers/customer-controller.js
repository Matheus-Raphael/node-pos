const Customer = require('../app/models/customer');
const repository = require('../repository/customer-repository');
const authService = require('../services/auth-service');

exports.getAll = function(req, res){
    Customer.find(function(err, customers){
        if(err)
            res.send(err);

        res.status(200).json({
            message: "retorno ok de todos os customers",
            allProducts: customers
        });
    });
}

exports.getById = function(req, res){
    const id = req.params.customerId;
    Customer.findById(id, function(err, customer){
        if (err){
            res.status(500).json({
                message: "Erro ao tentar encontrar customer; ID mal formado"
            });
        }else if(customer == null){
            res.status(400).json({
                message: "customer não encontrado para o id passado"
            });
        }else{
            res.status(200).json({
                message: "customer encontrado",
                customer: customer
            });
        }
    });
}

exports.put = async (req, res) => {
    try {
        const id = req.params.customerId;
        const data = await repository.put(id, req.body);
        res.status(200).send({
            message: "Customer atualizado com sucesso",
            dados: data
        })
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição.",
            erro: error
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.customerId;
        await repository.delete(id)
        res.status(200).send({
            message: "Customer removido com sucesso."
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição.",
            erro: error
        });
    }
}

exports.customerRegister = async (req, res) =>{
    try {
        await repository.register(req.body.name, req.body.email, req.body.password);
        res.status(201).json({message:"usuário registrado com sucesso"});
    } catch (error) {
        res.status(500).json({message: "erro ao tentar criar um novo usuário"});
    }
}

exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email:req.body.email,
            password:req.body.password
        });

        if(!customer){
            res.status(404).send({message: 'Usuário ou senha inválidos'});
            return;
        }
        const token = await authService.generateToken({
            id: customer.id,
            email: customer.email,
            name: customer.name,
        });

        res.status(201).send({
            token: token,
            data:{
                email:customer.email,
                name:customer.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            error: error
        });
    }
}