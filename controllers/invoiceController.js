const Invoice = require('../models/invoice');

exports.findAll = async function (req, res) {
    const invoices = await Invoice
        .find({user_id: req.user.id})
        .sort({paid_status: -1})
    res.render('invoices', {
        user: req.user.username,
        invoices: invoices
    })
}

exports.create = (body, user_id, model) =>{
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
