
//I try to keep controllers and http stuff separate. Again, just for easy tests

exports.findAll = function (user_id, model) {
    const invoices = model
        .find({user_id: user_id})
        .sort({paid_status: -1})
        return invoices
}

exports.create = (body, user_id, model) => {
    const {invoice_value, customer_name, description, paid_status, pay_date} = body;
    const invoice = new model({
        user_id: user_id,
        invoice_value,
        customer_name,
        description,
        pay_date,
        paid_date: '',
        paid_status: 'unpaid'
    })
    return invoice.save()

}

exports.update = function (body, user_id, model) {
    let {id, paid_date} = body
        return model.findOneAndUpdate({
            _id: id,
            user_id: user_id
        }, {
            paid_date: paid_date,
            paid_status: 'paid'
        })
 
    }
