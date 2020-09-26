const Produto = require('../app/models/product');

exports.post = async(data) => {
    const produto = new Produto(data);
    await produto.save();
}

exports.getAll = async() => {
    const res = await Produto.find().populate('categoria');
    return res;
}

exports.getById = async(id) => {
    const res = await Produto.findById(id).populate('categoria');
    return res;
}

exports.put = async(id, data) => {
    await Produto.findByIdAndUpdate(id, {
        $set:{
            nome: data.nome,
            preco: data.preco,
            descricao: data.descricao,
            categoria: data.categoria
        }
    }).populate('categoria');
}

exports.delete = async(id) => {
    await Produto.findByIdAndDelete(id);
}