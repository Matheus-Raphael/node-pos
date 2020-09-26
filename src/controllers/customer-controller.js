const repository = require('../repository/customer-repository');

exports.post = async (req, res) => {
    try {
        await repository.post({
            nome:     req.body.nome,
            email:    req.body.email,
            password: req.body.password
        });
        res.status(201).send({
            message: 'Customer cadastrado com sucesso.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
}

exports.getAll = async (req, res) => {
    try {
        const data = await repository.getAll();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição.", 
            erro: error
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.customerId;
        const data = await repository.getById(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            erro: error
        });
    }
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