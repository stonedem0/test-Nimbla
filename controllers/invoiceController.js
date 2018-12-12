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

exports.createForm = (req, res) => {
    res.render('invoice')
}

exports.payForm = (req, res) => {
    let id = req.params.id
    res.render('pay', {id: id})
}
exports.create = async function (req, res) {
    const {invoice_value, customer_name, description, paid_status, pay_date} = req.body;
    const invoice = new Invoice({
        user_id: req.user.id,
        invoice_value,
        customer_name,
        description,
        pay_date,
        paid_date: '',
        paid_status: 'unpaid'
    })
    try {
        await invoice.save()
        res.redirect('/invoices')
    } catch (err) {
        res.send(400, err)
    }
}

exports.update = async function (req, res) {
    let {id, paid_date} = req.body
    if (!paid_date) {
        return res.render('pay', {
            id: id,
            message: 'you should pick a date'
        })
    }
    try {
        await Invoice.findOneAndUpdate({
            _id: id,
            user_id: req.user.id
        }, {
            paid_date: paid_date,
            paid_status: 'paid'
        })
        res.redirect('/invoices')
    } catch (err) {
        res.send(err);
    }
}