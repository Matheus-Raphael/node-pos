const Customer = require('../app/models/customer');

exports.post = async(data) => {
    const customer = new Customer(data);
    await customer.save();
}

exports.getAll = async() => {
    const res = await Customer.find();
    return res;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}

exports.put = async(id, data) => {
    await Customer.findByIdAndUpdate(id, {
        $set:{
            nome:     data.nome,
            email:    data.email,
            password: data.password
        }
    });
}

exports.delete = async(id) => {
    await Customer.findByIdAndDelete(id);
}
