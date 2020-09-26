const Customer = require('../app/models/customer');

exports.post = async (req, res) => {
    const { nome, email, password } = req.body;
    const customer = await Customer.create({
        nome,
        email,
        password
    });

    await customer.save((error) => {
        if(error)
            res.status(500).json(
                {
                    message: "Error ao tentar salvar um novo customer " + error
                }
            );

        res.status(201).json({message: 'Customer inserido com sucesso'});
    });
};

exports.getAll = async (req, res) => {
    customer = await Customer.find();
    res.status(200).json(customer);
};

exports.getById = async (req, res) => {
    const id = req.params.customerId;
    customer = await Customer.findById(id);
    res.status(200).json(customer);
};

exports.put = async (req, res) => {
    const id = req.params.customerId;

    await Customer.findById(id, function (err, customer) {
        if (err) {
            res.status(500).json({
                message: "Erro ao tentar encontrar customer; ID mal formado"
            });
        } else if (customer == null) {
            res.status(400).json({
                message: "customer não encontrado para o id passado"
            });
        } else {
            customer.nome = req.body.nome;
            customer.email = req.body.email;
            customer.password = req.body.password;

            customer.save(function (error) {
                if (error)
                    res.send(`Erro ao tentar atualizar o customer: ${error}`);

                res.status(200).json({
                    message: "customer atualizado com sucesso"
                });
            });
        }
    });
};

exports.delete = function (req, res) {
    Customer.findByIdAndRemove(req.params.customerId, (err, customer) => {
        if (err)
            res.status(500).send("Erro ao deletar ", err)

        const response = {
            message: "Customer removido com sucesso",
            id: customer.id
        };
        return res.status(200).send(response);
    });
};